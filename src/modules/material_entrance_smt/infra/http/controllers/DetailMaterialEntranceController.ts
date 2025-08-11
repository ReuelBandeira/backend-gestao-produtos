/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateDetailMaterialEntranceService from '@modules/material_entrance_smt/services/CreateDetailMaterialEntranceService';
// eslint-disable-next-line import/no-duplicates
import UpdateDetailMaterialEntranceService from '@modules/material_entrance_smt/services/UpdateDetailMaterialEntranceService';
// eslint-disable-next-line import/no-duplicates
import DeleteDetailMaterialEntranceService from '@modules/material_entrance_smt/services/DeleteDetailMaterialEntranceService';
import CreateDetailValidationMaterialEntranceService from '@modules/material_entrance_smt/services/CreateDetailValidationMaterialEntranceService';
import DetailMaterialEntranceRepository from '../../typeorm/repositories/DetailMaterialEntranceRepository';

// eslint-disable-next-line import/order
export default class DetailMaterialEntranceController {
  // public async create(request: Request, response: Response): Promise<Response> {
  //   const {id_material_entrance_smt,component,component_quantity,uc_code} = request.body;

  //   const { id: id_employee } = request.user;

  //   const createMaterial = container.resolve(CreateDetailMaterialEntranceService);

  //   const entrance_detail = new DetailMaterialEntranceRepository();

  //   const products = await entrance_detail.findIdProduct(Number(id_material_entrance_smt));

  //   const delimiters = await entrance_detail.findProductDelimiter(Number(products[0].id_product));

  //   const delimiters_product_interno = delimiters.filter(function(item){
  //     return (item.type === 'interno' );
  //   });
  //   const delimiters_product_externo = delimiters.filter(function(item){
  //     return (item.type === 'externo' );
  //   });

  //   const validation_type = component.split(";").length;

  //   let delimiter: string | null = null;

  //   // Loop para verificar qual é o delimitador da string component

  //   if (validation_type > 3) {
  //       for (let i = 0; i < delimiters_product_externo.length; i++) {
  //         if (component.includes(delimiters_product_externo[i].delimiter)) {
  //           delimiter = delimiters_product_externo[i].delimiter;
  //           break;
  //         }
  //       }
  //   } else {
  //     for (let i = 0; i < delimiters_product_interno.length; i++) {
  //         if (component.includes(delimiters_product_interno[i].delimiter)) {
  //           delimiter = delimiters_product_interno[i].delimiter;
  //           break;
  //         }
  //       }
  //   };

  //   // Se o delimitador foi encontrado, aplicamos o método split

  //   const component_parts= [];

  //   if (validation_type !==1) {
  //       if (delimiter) {
  //         component_parts.push(...component.split(delimiter));
  //       }
  //       else {
  //         throw new AppError('Delimitador não encontrado na string component', 400);
  //       }
  //   }

  //   let position_qty = null;

  //   if (validation_type !==1){
  //     if (delimiter) {
  //       const delimiters = validation_type > 3 ? delimiters_product_externo : delimiters_product_interno;
  //       const foundDelimiter = delimiters.find(d => d.delimiter === delimiter);
  //       if (foundDelimiter) {
  //         position_qty = foundDelimiter.position_quantity;
  //       }
  //     }
  //   }

  //   let qty_component; // quantidade retirada do qrcode informado

  //   if (position_qty !== null){
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const position =Number((position_qty)-1);
  //     console.log("position",position);
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     qty_component = component_parts[position];
  //   }


  //   const sequential_old = String(component_parts[component_parts.length - 1]); // numero de serie como vem da string

  //   const delimita_serial = [';', '#', 'ç', '-']; // delimitadores para o serial

  //   const regex = new RegExp(`[${delimita_serial.join('')}]`);
  //   const partes = sequential_old.split(regex);

  //   // const sequential = partes[partes.length - 1];
  //   // const componentFormatted = component_parts[0];

  //   let sequential;
  //   let componentFormatted;

  //   if (validation_type === 1) { // se o valor da string informada for apenas tamanho 1
  //     sequential = component;
  //     componentFormatted = component;
  //   } else {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     sequential = partes[partes.length - 1];
  //     // eslint-disable-next-line prefer-destructuring
  //     componentFormatted = component_parts[0];
  //   }

  //   const validation_main_component = await entrance_detail.findAllBomMainComponent(String(products[0].product_name),String(componentFormatted));

  //   const validation_alternative = await entrance_detail.findAllBomAlternative(String(products[0].product_name),String(componentFormatted));

  //   const validation_sequencial = await entrance_detail.findSequencialValidation(Number(id_material_entrance_smt),String(componentFormatted),String(sequential));


  //   if (validation_sequencial?.length !==0){
  //     throw new AppError('Esse componente já deu entrada! Por Favor verificar', 400);
  //   }
  //   // eslint-disable-next-line eqeqeq
  //   if (validation_main_component.length ==0 && validation_alternative.length ==0){
  //     throw new AppError('Esse componente não pertence a Bom', 400);
  //   }

  //   if (validation_main_component.length !==0) {

  //     const material = await createMaterial.execute({
  //       id_material_entrance_smt ,
  //       component:componentFormatted,
  //       component_quantity,
  //       uc_code,
  //       string_qr_code:component,
  //       serial_component:sequential,
  //       main_component:validation_main_component[0].main_component,
  //       id_employee
  //     });
  //     return response.status(201).json(material);

  //   }if(validation_alternative.length !==0){

  //     const material = await createMaterial.execute({
  //       id_material_entrance_smt ,
  //       component,
  //       component_quantity,
  //       uc_code,
  //       string_qr_code:component,
  //       serial_component:sequential,
  //       main_component:validation_alternative[0].main_component,
  //       id_employee
  //     });
  //     return response.status(201).json(material);

  //   }

  // }

  public async create(request: Request, response: Response): Promise<Response> {
    const {id_material_entrance_smt,component,component_quantity,uc_code,string_qr_code,serial_component,main_component} = request.body;

    const { id: id_employee } = request.user;

    const createMaterial = container.resolve(CreateDetailMaterialEntranceService);

      const material = await createMaterial.execute({
        id_material_entrance_smt,
        component,
        component_quantity,
        uc_code,
        string_qr_code,
        serial_component,
        main_component,
        id_employee
      });

      return response.status(201).json(material);

  }

  public async index(request: Request, response: Response): Promise<Response> {

    const {id_material_entrance_smt} = request.query;

    const actions = new DetailMaterialEntranceRepository();

    const detail_materials = await actions.allRegisters(Number(id_material_entrance_smt));

    return response.json({
      detail_materials,
    });
  }




  public async show(request: Request, response: Response): Promise<Response> {
    const { component } = request.query;

    const materialRepository = new DetailMaterialEntranceRepository();

    const material = await materialRepository.findByNameSearch(String(component));

    if (!material) {
      throw new AppError('This material does not exist', 404);
    }

    return response.json(material);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {component_quantity} = request.body;

    const { id: id_employee } = request.user;

    const idParsed = parseInt(id);
    const updateMaterial = container.resolve(UpdateDetailMaterialEntranceService);

    const material = await updateMaterial.execute({
      id: idParsed,
      component_quantity,
      id_employee
    });

    return response.status(201).json(material);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteAction = container.resolve(DeleteDetailMaterialEntranceService);

    await deleteAction.execute({id:parsedId});

    return response.status(204).json({});
  }

  public async findActions(request: Request, response: Response): Promise<Response> {
    const actions = new DetailMaterialEntranceRepository();

    const materials_registers_detais = await actions.findAllRegisters();

    return response.json({
      materials_registers_detais,

    });
  }

  // public async validationEntrance(request: Request, response: Response): Promise<Response> {
  //   const {id_material_entrance_smt,component,uc_code} = request.query;
  //   // const { id: id_employee } = request.user;
  //   const validationService =  container.resolve(CreateDetailValidationMaterialEntranceService);
  //   const validationEntrance= await validationService.execute({id_material_entrance_smt,component,uc_code} as any);

  //   return response.status(200).json({validationEntrance});

  // }

  public async validationEntrance(request: Request, response: Response): Promise<Response> {
    const { id_material_entrance_smt, component, uc_code } = request.query;

    const validationService = container.resolve(CreateDetailValidationMaterialEntranceService);

    const validationEntrance = await validationService.execute({
      id_material_entrance_smt: Number(id_material_entrance_smt),
      component: String(component),
      uc_code: String(uc_code),
    });

    return response.status(200).json({ validationEntrance });
  }


}
