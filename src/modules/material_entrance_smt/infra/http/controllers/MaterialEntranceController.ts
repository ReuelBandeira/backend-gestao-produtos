/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateMaterialEntranceService from '@modules/material_entrance_smt/services/CreateMaterialEntranceService';
import UpdateMaterialEntranceService from '@modules/material_entrance_smt/services/UpdateMaterialEntranceService';
import DeleteMaterialEntranceService from '@modules/material_entrance_smt/services/DeleteMaterialEntranceService';
import MaterialEntranceRepository from '../../typeorm/repositories/MaterialEntranceRepository';
import CreateMaterialXBomService from '@modules/material_entrance_smt/services/CreateMaterialXBomService';

export default class MaterialEntranceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {id_product,kit_quantity,production_order} = request.body;

    const { id: id_employee } = request.user;

    const createMaterial = container.resolve(CreateMaterialEntranceService);

    const material = await createMaterial.execute({
      id_product,
      kit_quantity,
      production_order,
      id_employee
    });


    return response.status(201).json(material);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const materialRepository = new MaterialEntranceRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      materials,
      totalPages,
      totalAction,

    } = await materialRepository.findAllAction(
      p,
    );

    return response.json({
      materials,
      totalPages,
      totalAction,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { production_order } = request.query;

    const materialRepository = new MaterialEntranceRepository();

    const material = await materialRepository.findByNameSearch(String(production_order));

    if (!material) {
      throw new AppError('This material does not exist', 404);
    }

    return response.json(material);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {production_order} = request.body;

    const { id: id_employee } = request.user;

    const idParsed = parseInt(id);
    const updateMaterial = container.resolve(UpdateMaterialEntranceService);

    const material = await updateMaterial.execute({
      id: idParsed,
      production_order,
      id_employee
    });

    return response.status(201).json(material);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteAction = container.resolve(DeleteMaterialEntranceService);

    await deleteAction.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findActions(request: Request, response: Response): Promise<Response> {
    const actions = new MaterialEntranceRepository();

    const materials_registers = await actions.findAllRegisters();

    return response.json({
      materials_registers,

    });
  }

  public async validationMaterials(request: Request, response: Response): Promise<Response> {

    const {id_product} = request.query;

    const materials = new MaterialEntranceRepository();

    const materials_validation = await materials.findAllProducts(Number(id_product));

    const registers=[];
    for(let i = 0; i < materials_validation.length; i++){

      const id_materials_validation=materials_validation[i].id;

      const product_id = materials_validation[i].id_product;

      // eslint-disable-next-line no-await-in-loop
      const qnt_entrace = await materials.findAllQntEntrace(Number(id_materials_validation));
      const qtt_materials_entry=qnt_entrace.length;

      // eslint-disable-next-line no-await-in-loop
      const name_product = await materials.findProductName(Number(product_id));

      // eslint-disable-next-line no-await-in-loop
      const waiting_for_entry_bom = await materials.findAllBomQtt(String(name_product[0].product_name));
      const qtt_bom = waiting_for_entry_bom.length;

      const validation_materials= materials_validation[i];

      const diference_quantity_entrance = qtt_bom - qtt_materials_entry;

      const obj_result={...
        validation_materials,
        qtt_materials_entry,
        qtt_bom,
        diference_quantity_entrance
      };
      registers.push(obj_result);
    }
    const total_lote = materials_validation?.length;



    return response.json({
      materials_validation:registers,
      total_lote
    });
  }

  public async receivedBom(request: Request, response: Response): Promise<Response> {
    const {id_product,id_material_entrance_smt} = request.query;

    const materials = new MaterialEntranceRepository();

    const receive_registers = await materials.findAllProductEntrance(Number(id_product),Number(id_material_entrance_smt));

    const quantity_kit= Number(receive_registers[0].kit_quantity);

    const name_product = await materials.findProductName(Number(id_product));

    const bom = await materials.findAllBomMainComponent(String(name_product[0].product_name));

    console.log("bom",bom);

    const all_detail_material = await materials.findAllDetailMaterialEntrance(Number(id_material_entrance_smt));

    console.log("all_detail_material",all_detail_material
    );

    const expected_bom_qtt: never[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < bom.length; i++) {
      const qnt_kit=quantity_kit;
      const expected_quantitative = bom[i].qty_used * qnt_kit
      const obj_result= {
          struct_code:bom[i].struct_code,
          main_component:bom[i].main_component,
          qty_used:bom[i].qty_used,
          quantity_kit,
          expected_quantitative,
          // description:bom[i].description,
          id_production_order:bom[i].id_production_order

      };
      expected_bom_qtt.push(obj_result)
    };

    const only_components = all_detail_material.map((value) => value.component);
    const repeated_components = [...new Set(only_components)];

    const result_entrance_material = [];
    for (let i = 0; i < repeated_components.length; i++) {

      const list = all_detail_material.filter(function(item) {
        return (item.component == repeated_components[i]);
      });
      const just_value = list.map((value) => value.component_quantity);

      for (let i = 0; i < 1; i++) {

          const reducer_bom = (accumulator: any, curr: any) => accumulator + curr;
          const sum_bom = (just_value.reduce(reducer_bom));

          const result_amount = {
              id:list[i].id,
              component:list[i].component,
              component_quantity:sum_bom,
              string_qr_code: list[i].string_qr_code,
              serial_component: list[i].serial_component,
              uc_code:list[i].uc_code,
              id_material_entrance_smt:list[i].id_material_entrance_smt,
              id_employee:list[i].id_employee
          }
        result_entrance_material.push(result_amount);
      };

    };

    //  em comum na bom e result_entrance_material
    const found_bom_entrance = expected_bom_qtt.filter(b => result_entrance_material.filter(ex => ex.component === b.main_component).length);
    //  em comum result_entrance_material e na bom
    const found_entrance_bom = result_entrance_material.filter(b => expected_bom_qtt.filter(ex => ex.main_component === b.component).length);

    const materials_compared_bom = []; // comparação dos materias que entraram com a lista da BOM

    for (let i = 0; i < found_bom_entrance.length; i++) {

        const obj_group = {
            id: found_entrance_bom[i].id,
            struct_code: found_bom_entrance[i].struct_code,
            main_component:found_bom_entrance[i].main_component,
            qty_used_bom:found_bom_entrance[i].qty_used,
            quantity_kit:found_bom_entrance[i].quantity_kit,
            component_quantity_entrance:found_entrance_bom[i].component_quantity,
            expected_quantitative_bom:found_bom_entrance[i].expected_quantitative,
            diference_bom_entrance: found_entrance_bom[i].component_quantity - found_bom_entrance[i].expected_quantitative,
            // description: found_bom_entrance[i].description,
            id_production_order: found_bom_entrance[i].id_production_order,
            string_qr_code:found_entrance_bom[i].string_qr_code,
            serial_component:found_entrance_bom[i].serial_component,
            uc_code:found_entrance_bom[i].uc_code,
            id_material_entrance_smt:found_entrance_bom[i].id_material_entrance_smt,
            id_employee:found_entrance_bom[i].id_employee,
            status:"ENTRADA"
        };
        materials_compared_bom.push(obj_group)
    };

    // ordenar entrada
    materials_compared_bom.sort(function(x,y){
      return y.id - x.id
    });

    //  expected_entrance_material = materias que estão na BOM e ainda não entraram
    const expected_entrance_material = expected_bom_qtt.filter(function(item){ return (item.main_component !== null);
    });

    const only_components_materials_compared_bom = materials_compared_bom.map((value) => value.main_component);

    for (let i = 0; i < found_bom_entrance.length; i++) {
      const toRemove = only_components_materials_compared_bom[i];
      const indexParaRemover = expected_entrance_material.findIndex(propriedade => propriedade.main_component === toRemove);
      if (indexParaRemover !== -1) {
          expected_entrance_material.splice(indexParaRemover, 1);
      }
    };

    const  waiting_input = [];

    for (let i = 0; i < expected_entrance_material.length; i++) {

            const waiting_entrance = {
                id:"N/A",
                struct_code: expected_entrance_material[i].struct_code,
                main_component: expected_entrance_material[i].main_component,
                qty_used_bom: expected_entrance_material[i].qty_used_bom,
                quantity_kit: expected_entrance_material[i].quantity_kit,
                component_quantity_entrance: "N/A",
                expected_quantitative_bom: expected_entrance_material[i].expected_quantitative,
                diference_bom_entrance: "N/A",
                // description: expected_entrance_material[i].description,
                id_production_order: expected_entrance_material[i].id_production_order,
                string_qr_code: "N/A",
                serial_component: "N/A",
                uc_code: "N/A",
                id_material_entrance_smt: 7,
                id_employee: "N/A",
                status:"AGUARDANDO"
            };
            waiting_input.push(waiting_entrance)
    };

    const result_compared_material = materials_compared_bom.concat(waiting_input);

    const registers=[];
    for(let i = 0; i < result_compared_material.length; i++){

    const materials_find = new MaterialEntranceRepository();

    const component=result_compared_material[i].main_component;

    // eslint-disable-next-line no-await-in-loop
    const description = await materials_find.findDescriptionComponent(String(component));

    const total= result_compared_material[i];
      const obj_result_material={...
        total,
        description
      };
      registers.push(obj_result_material);
    }

    return response.json({
      result_compared_material_bom:registers
    });
  }

  public async materialXbom(request: Request, response: Response): Promise<Response> {
    const {id_product,id_material_entrance_smt} = request.query;

    const createMaterial = container.resolve(CreateMaterialXBomService);

    const material = await createMaterial.execute({
      id_product,
      id_material_entrance_smt
    });


    return response.json(material);
  }




}
