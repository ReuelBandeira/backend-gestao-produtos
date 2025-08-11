import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import DetailMaterialEntrance from '../infra/typeorm/entities/DetailMaterialEntrance';
import IDetailMaterialEntranceRepository from '../repositories/IDetailMaterialEntranceRepository';

interface IRequest {
  id_material_entrance_smt : number;
  component: string;
  uc_code: string;
}

@injectable()
export default class CreateDetailValidationMaterialEntranceService{
  constructor(
    @inject('DetailMaterialEntranceRepository')
    private detailMaterialEntranceRepository: IDetailMaterialEntranceRepository,
  ) {}

  async execute({
    id_material_entrance_smt ,
    component,
    uc_code
}: IRequest): Promise<DetailMaterialEntrance> {

    const products = await this.detailMaterialEntranceRepository.findIdProduct(Number(id_material_entrance_smt));

    const delimiters = await this.detailMaterialEntranceRepository.findProductDelimiter(Number(products[0].id_product));

    // eslint-disable-next-line eqeqeq
    if (delimiters.length==0){
      throw new AppError('Não existe delimitador cadastrado para este produto!', 400);
    }

    const delimiters_product_interno = delimiters.filter(function(item){
      return (item.type === 'interno' );
    });
    const delimiters_product_externo = delimiters.filter(function(item){
      return (item.type === 'externo' );
    });

    const validation_type = component.split(";").length;

    let delimiter: string | null = null;

    // Loop para verificar qual é o delimitador da string component

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
      // eslint-disable-next-line no-restricted-syntax
      for (const item of delimiters_product_externo) {
        if (item.delimiter === delimiter) {
          position_qty = item.position_quantity;
          break; // Assuming there is only one match, you can remove this line if multiple matches are expected.
        }
      }
    };

    let qty_component; // quantidade retirada do qrcode informado

    if (position_qty !== null && validation_type !==0 ){
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const position =Number((position_qty)-1);
      qty_component =Number(component_parts[position]);
    }else {qty_component = 0}

    if (!/^\d+$/.test(qty_component)) {
      throw new AppError('Posição da quantidade está incorreta. Favor informar correta na Lista de delimitadores!', 400);
    }

    const sequential_old = String(component_parts[component_parts.length - 1]); // numero de serie como vem da string

    const partes = sequential_old.split(delimiter);

    // eslint-disable-next-line prefer-const
    let sequential = partes[partes.length - 1];
    // eslint-disable-next-line prefer-destructuring, prefer-const
    let componentFormatted = component_parts[0];

    const validation_main_component = await  this.detailMaterialEntranceRepository.findAllBomMainComponent(String(products[0].product_name),String(componentFormatted));

    const validation_alternative = await this.detailMaterialEntranceRepository.findAllBomAlternative(String(products[0].product_name),String(componentFormatted));

    const validation_sequencial = await this.detailMaterialEntranceRepository.findSequencialValidation(Number(id_material_entrance_smt),String(componentFormatted),String(sequential));

    if (validation_sequencial?.length !==0){
      throw new AppError('Esse componente já deu entrada! Por Favor verificar', 400);
    }
    // eslint-disable-next-line eqeqeq
    if (validation_main_component.length ==0 && validation_alternative.length ==0){
      throw new AppError('Esse componente não pertence a Bom', 400);
    }

    if (validation_main_component.length !==0) {

      const material = {
        id_material_entrance_smt ,
        component:componentFormatted,
        component_quantity:qty_component,
        uc_code,
        string_qr_code:component,
        serial_component:sequential,
        main_component:validation_main_component[0].main_component,

      };
      return material;

    }if(validation_alternative.length !==0){

      const material = {
        id_material_entrance_smt ,
        // component,
        component:componentFormatted, // adcionado na refatoração
        component_quantity:qty_component,
        uc_code,
        string_qr_code:component,
        serial_component:sequential,
        main_component:validation_alternative[0].main_component,
      };
      return material;

    }

  }

}

