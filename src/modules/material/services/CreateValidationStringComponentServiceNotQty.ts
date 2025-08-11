/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import { MaterialManager } from '../infra/typeorm/entities/MaterialManager';


interface IRequest {
  list_code: string;
  component: string;
}

@injectable()
export default class CreateValidationStringComponentServiceNotQty {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
  ) { }

  public async execute({
    list_code,
    component
  }: IRequest): Promise<MaterialManager> {

    // remove espaço em branco do componente
    function removeEspacos(Typestring: string) {
      if (typeof Typestring !== 'string') {
        throw new Error('O argumento deve ser uma string');
      }
      return Typestring.replace(/\s/g, '');
    }
    // eslint-disable-next-line no-param-reassign
    component=removeEspacos(component);

    const findProduct = await this.materialRepository.findProductName(String(list_code));

    const delimiters = await this.materialRepository.findProductDelimiter(String(findProduct[0].struct_code));

    if (!delimiters){
      throw new AppError('Não existe delimitador cadastrado para o produto', 400);
    }


    const delimiters_product_interno = delimiters.filter(function(item){
      return (item.type === 'interno' );
    });
    const delimiters_product_externo = delimiters.filter(function(item){
      return (item.type === 'externo' );
    });

    const validation_type = component.split(";").length;

    let delimiter= null;

    // Loop para verificar qual é o delimitador da string component

    // eslint-disable-next-line eqeqeq
    if (validation_type > 3 || validation_type==1) {
        for (let i = 0; i < delimiters_product_externo.length; i++) {
          if (component.includes(delimiters_product_externo[i].delimiter)) {
            delimiter = delimiters_product_externo[i].delimiter;
            break;
          }
        }
    } else {
      for (let i = 0; i < delimiters_product_interno.length; i++) {
          if (component.includes(delimiters_product_interno[i].delimiter)) {
            delimiter = delimiters_product_interno[i].delimiter;
            break;
          }
        }
    };

    // Se o delimitador foi encontrado, aplicamos o método split

    const component_parts= [];

    if (validation_type !==0) {
        if (delimiter) {
          component_parts.push(...component.split(delimiter));
        }
        else {
          throw new AppError('Delimitador não encontrado na string componente', 407);
        }
    }

    const sequential_old = String(component_parts[component_parts.length - 1]); // numero de serie como vem da string

    const partes = sequential_old.split(delimiter);

    let sequential = partes[partes.length - 1];

    let componentFormatted = component_parts[0];


    return ({
      sequential,
      componentFormatted
    });

  }
}
