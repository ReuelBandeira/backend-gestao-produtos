import ICreateDetailMaterialEntranceDTO from '../dtos/IDetailCreateMaterialEntranceDTO';
import DetailMaterialEntrance from '../infra/typeorm/entities/DetailMaterialEntrance';

export default interface IDetailMaterialEntranceRepository {
  findById(id: number): Promise<DetailMaterialEntrance | undefined>;
  findByNameSearch(
    descriptiom: string
  ): Promise<(DetailMaterialEntrance | undefined)[] | undefined>;
  findByName(descriptiom: string): Promise<DetailMaterialEntrance | undefined>;
  findAllAction(): Promise<DetailMaterialEntrance | DetailMaterialEntrance[]>;

  create(
    data: ICreateDetailMaterialEntranceDTO
  ): Promise<DetailMaterialEntrance>;
  update(action: DetailMaterialEntrance): Promise<DetailMaterialEntrance>;
  delete(id: number): Promise<void>;
  findIdProduct(id: number): Promise<DetailMaterialEntrance [] | undefined>;
  findProductDelimiter(id_product: number): Promise<DetailMaterialEntrance [] | []>;
  findAllBomMainComponent(struct_code: string,main_component:string): Promise<DetailMaterialEntrance [] | []>;
  findAllBomAlternative(struct_code: string,alternative_component:string): Promise<DetailMaterialEntrance [] | []>;
  findSequencialValidation(id_material_entrance_smt:number, component:string, serial_component: string): Promise<DetailMaterialEntrance [] | []>;

  findByProductionOrder(
    production_order: string
  ): Promise<DetailMaterialEntrance[]>;
}
