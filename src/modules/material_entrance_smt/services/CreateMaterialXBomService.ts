import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MaterialEntrance from '../infra/typeorm/entities/MaterialEntrance';
import IMaterialEntranceRepository from '../repositories/IMaterialEntranceRepository';

interface IRequest {
  id_product:number;
  id_material_entrance_smt:number;
}

@injectable()
export default class CreateMaterialXBomService {
  constructor(
    @inject('MaterialEntranceRepository')
    private materialEntranceRepository: IMaterialEntranceRepository,
  ) {}

  async execute({id_product,id_material_entrance_smt}: IRequest): Promise<MaterialEntrance>
   {
    const receive_registers = await this.materialEntranceRepository.findAllProductEntrance(Number(id_product),Number(id_material_entrance_smt));

    const quantity_kit= Number(receive_registers[0].kit_quantity);

    const name_product = await this.materialEntranceRepository.findProductName(Number(id_product));

    const bom = await this.materialEntranceRepository.findAllBomMainComponent(String(name_product[0].product_name));

    const material = await this.materialEntranceRepository.findAllDetailMaterialEntrance(Number(id_material_entrance_smt));

    const only_main_components_bom = bom.map((value) => value.main_component);
    const repeated_main_components_bom = [...new Set(only_main_components_bom)];

    const result_bom: never[] = []; // resultado da soma das quantidades dos componentes e da multiplicação pelo valor do kit

    for (let i = 0; i < repeated_main_components_bom.length; i++) {

     const qnt_kit=quantity_kit;

      const list_bom = bom.filter(function(item) {
        return (item.main_component == repeated_main_components_bom[i]);
      });
      const just_value_bom = list_bom.map((value) => value.qty_used);

      for (let i = 0; i < 1; i++) {

          const reducer_bom = (accumulator, curr) => accumulator + curr;
          const sum_bom = (just_value_bom.reduce(reducer_bom));

          const result_amount_bom = {
              struct_code:list_bom[i].struct_code,
              main_component:list_bom[i].main_component,
              qty_used:list_bom[i].qty_used,
              expected_quantitative:sum_bom * qnt_kit,
          }
        result_bom.push(result_amount_bom);
      };

    };

    const only_components_material = material.map((value) => value.component);
        const repeated_components_material = [...new Set(only_components_material)];

        const result_material = [];
        for (let i = 0; i < repeated_components_material.length; i++) {

          const list_material = material.filter(function(item) {
            return (item.component == repeated_components_material[i]);
          });
          const just_value_material = list_material.map((value) => value.component_quantity);

          for (let i = 0; i < 1; i++) {

              const reducer_material = (accumulator, curr) => accumulator + curr;
              const sum_material = (just_value_material.reduce(reducer_material));

              const result_amount_material = {
                  id:list_material[i].id,
                  component:list_material[i].component,
                  component_quantity:sum_material,
                  string_qr_code:list_material[i].string_qr_code,
                  uc_code:list_material[i].uc_code,
                  id_material_entrance_smt:list_material[i].id_material_entrance_smt

              }
            result_material.push(result_amount_material);
          };

        };

    //  filtramos o que existe na bom e tem em material
    const found_bom = result_bom.filter(b => result_material.filter(ex => ex.component === b.main_component).length);

    // filtramos o que tem em material e existe na bom
    const found_material = result_material.filter(b => result_bom.filter(ex => ex.main_component === b.component).length);

    const mergedArray = found_bom.filter(bomItem => {
      return found_material.some(matItem => matItem.component === bomItem.main_component);
    }).map(bomItem => {
      const materialItem = found_material.find(matItem => matItem.component === bomItem.main_component);
      return {
        ...bomItem,
        id: materialItem.id,
        component_quantity: materialItem.component_quantity,
        string_qr_code: materialItem.string_qr_code,
        uc_code: materialItem.uc_code,
        id_material_entrance_smt: materialItem.id_material_entrance_smt,
      }
    });

    const materials_compared_bom = [];

    for (let i = 0; i < mergedArray.length; i++) {
      const obj_group = {
          id:mergedArray[i].id,
          struct_code: mergedArray[i].struct_code,
          main_component:mergedArray[i].main_component,
          qty_used_bom:mergedArray[i].qty_used,
          component_quantity_entrance:mergedArray[i].component_quantity,
          expected_quantitative_bom:mergedArray[i].expected_quantitative,
          diference_bom_entrance: mergedArray[i].component_quantity - mergedArray[i].expected_quantitative,
          status:"ENTRADA"
      };
      materials_compared_bom.push(obj_group)
  };

  const expected_bom = result_bom.filter(function(item){ return (item.main_component !== null);
  });

  const no_entry_into_bom = materials_compared_bom.map((value) => value.main_component);

  // remove da bom os componentes que ja deram entrada

  for (let i = 0; i < found_bom.length; i++) {
    const toRemove = no_entry_into_bom[i];
    const indexParaRemover = expected_bom.findIndex(propriedade => propriedade.main_component === toRemove);
    if (indexParaRemover !== -1) {
        expected_bom.splice(indexParaRemover, 1);
    }
  };

  const waiting_input = []; // componentes aguardando entrada

  for (let i = 0; i < expected_bom.length; i++) {

          const waiting_entrance = {
              id:"N/A",
              struct_code: expected_bom[i].struct_code,
              main_component: expected_bom[i].main_component,
              qty_used_bom: expected_bom[i].qty_used_bom,
              component_quantity_entrance: "N/A",
              expected_quantitative_bom: expected_bom[i].expected_quantitative,
              diference_bom_entrance: "N/A",
              status:"AGUARDANDO"

          };
          waiting_input.push(waiting_entrance)
  };

  const result_compared_material = materials_compared_bom.concat(waiting_input);

  const registers=[];
    for(let i = 0; i < result_compared_material.length; i++){

    const component=result_compared_material[i].main_component;

    // eslint-disable-next-line no-await-in-loop
    const description = await this.materialEntranceRepository.findDescriptionComponent(String(component));

    const total= result_compared_material[i];

      const obj_result_material={...
        total,
        description
      };
      registers.push(obj_result_material);
    }

    registers.sort(function(x,y){
      return y.id - x.id
    });



  return ({result_compared_material_bom:registers});
  }
}
