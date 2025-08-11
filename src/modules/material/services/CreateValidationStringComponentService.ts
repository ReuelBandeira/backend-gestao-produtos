/* eslint-disable no-restricted-syntax */
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
export default class CreateValidationStringComponentService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
  ) {}

  public async execute({
    list_code,
    component
  }: IRequest): Promise<Promise<{
    sequential: string
    componentFormatted: string
    qty_component: number
  }> > {

    // remove espaço em branco do componente
    function removeEspacos(Typestring: string) {
      if (typeof Typestring !== 'string') {
        throw new Error('O argumento deve ser uma string');
      }
      return Typestring.replace(/\s/g, '');
    }
    // eslint-disable-next-line no-param-reassign
    component = removeEspacos(component);

    const findProduct = await this.materialRepository.findProductName(String(list_code));

    const delimiters = await this.materialRepository.findProductDelimiter(String(findProduct[0].struct_code));

    if (!delimiters) {
      throw new AppError('Não existe delimitador cadastrado para o produto', 400);
    }


    const delimiters_product_interno = delimiters.filter(function (item) {
      return (item.type === 'interno');
    });

    const delimiters_product_externo = delimiters.filter(function (item) {
      return (item.type === 'externo');
    });


    const validation_type = component.split(";").length;

    let delimiter = null;

    // Loop para verificar qual é o delimitador da string component

    if (validation_type > 3 || validation_type==1 ) {
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

    const component_parts = [];

    if (validation_type !== 0) {
      if (delimiter) {
        component_parts.push(...component.split(delimiter));
      }
      else {
        throw new AppError('Delimitador não encontrado na string componente', 407);
      }
    }

    let position_qty = null;

    if (validation_type ===3){
      // eslint-disable-next-line no-restricted-syntax
      for (const item of delimiters_product_interno) {
        if (item.delimiter === delimiter) {
          position_qty = item.position_quantity;
          break; // Assuming there is only one match, you can remove this line if multiple matches are expected.
        }
      }
    }else {
      for (const item of delimiters_product_externo) {
        if (item.delimiter === delimiter) {
          position_qty = item.position_quantity;
          break; // Assuming there is only one match, you can remove this line if multiple matches are expected.
        }
      }
    };

    let qty_component; // quantidade retirada do qrcode informado

    if (position_qty !== null && validation_type !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const position = Number((position_qty) - 1);
      qty_component = Number(component_parts[position]);
    } else { qty_component = 0 }


    if (!/^\d+$/.test(qty_component)) {
      throw new AppError('Quantidade não encontrada na string do componente, sendo erro de posição informada no cadastro de delimitador do produto ou campo de posição contém letras e não somente números', 406);
    }

    const sequential_old = String(component_parts[component_parts.length - 1]); // numero de serie como vem da string

    const partes = sequential_old.split(delimiter);

    // eslint-disable-next-line prefer-const
    let sequential = partes[partes.length - 1];
    // eslint-disable-next-line prefer-destructuring, prefer-const
    let componentFormatted = component_parts[0];

    const validation_qty = Number(qty_component);

    if (validation_qty === 0) {
      throw new AppError('Quantidade não encontrada na string do componente', 406);
    }

    return ({
      sequential,
      componentFormatted,
      qty_component: validation_qty
    });

  }
}
