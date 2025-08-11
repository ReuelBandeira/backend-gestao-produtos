import ICreateMaterialEntranceDTO from '../dtos/ICreateMaterialEntranceDTO';
import MaterialEntrance from '../infra/typeorm/entities/MaterialEntrance';

export default interface IMaterialEntranceRepository {
  findById(id: number): Promise<MaterialEntrance | undefined>;
  findByNameSearch(
    descriptiom: string
  ): Promise<(MaterialEntrance | undefined)[] | undefined>;
  findByName(descriptiom: string): Promise<MaterialEntrance | undefined>;
  findAllAction(): Promise<MaterialEntrance | MaterialEntrance[]>;

  create(data: ICreateMaterialEntranceDTO): Promise<MaterialEntrance>;
  update(action: MaterialEntrance): Promise<MaterialEntrance>;
  delete(id: number): Promise<void>;
  deleteValidation(id: number): Promise<MaterialEntrance[] | undefined>;

  //  materias x bom
  findAllProductEntrance(
    id_product: number,
    id_material_entrance_smt: number
  ): Promise<MaterialEntrance[] | undefined>;
  findProductName(id_product: number): Promise<MaterialEntrance[] | undefined>;
  findAllBomMainComponent(
    product_name: string
  ): Promise<MaterialEntrance[] | undefined>;
  findAllDetailMaterialEntrance(
    id_material_entrance_smt: number
  ): Promise<MaterialEntrance[] | undefined>;
  findDescriptionComponent(
    component: string
  ): Promise<MaterialEntrance[] | undefined>;

  findByOp(production_order: string): Promise<MaterialEntrance[]>;
}
