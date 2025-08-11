import ICreateProductionOderDTO, {
  ProductionOrdersPagination,
} from '../dtos/ICreateProductionOderDTO';

import { ProductionOrder } from '../infra/typeorm/entities/ProductionOrders';

export default interface IProductionOrdersRepository {
  findById(id: number): Promise<ProductionOrder | undefined>;
  findByProductName(product_name: string): Promise<ProductionOrder | undefined>;

  findProductionHistory(): Promise<ProductionOrder[] | undefined>;
  findDetailsSerial(
    id_work_station: number,
    page: number
  ): Promise<ProductionOrder[] | undefined>;
  findSeasonSerial(
    serial_number: number,
    page: number
  ): Promise<ProductionOrder[] | undefined>;

  findByCodeOp(mo_code: string): Promise<ProductionOrder | undefined>;
  findAllProductionOrders(page: number): Promise<ProductionOrdersPagination>;
  findByProductionOrderCodeSearch(
    mo_code: string
  ): Promise<(ProductionOrder | undefined)[] | undefined>;
  findAllOPsWithoutPagination(): Promise<ProductionOrder[]>;
  create(data: ICreateProductionOderDTO[]): Promise<ProductionOrder[]>;
  update(productionOder: ProductionOrder): Promise<ProductionOrder>;
  delete(id: number, mo_code: string): Promise<void>;
  deleteForce(id: number): Promise<void>;

  findAllDetailMaterialEntrance(
    id_material_entrance_smt: number
  ): Promise<ProductionOrder[] | undefined>;
  findListCodeToolPrinter(
    id_production_order: number
  ): Promise<ProductionOrder[] | undefined>;
  findComponentSetup(list_code: string): Promise<ProductionOrder[] | undefined>;
  findComponentRefil(list_code: string): Promise<ProductionOrder[] | undefined>;
  findTypeComponentScrap(
    list_code: string
  ): Promise<ProductionOrder[] | undefined>;
  findIdOp(production_order: string): Promise<ProductionOrder[] | undefined>;
  findAllLotesMaterial(
    id_product: number,
    production_order: string
  ): Promise<ProductionOrder[] | undefined>;
  findIDProduct(mo_code: string): Promise<ProductionOrder[] | undefined>;
  findSerialsTrackings(
    production_order: string
  ): Promise<ProductionOrder[] | undefined>;
  findSerialsInScrap(
    serial_number: string
  ): Promise<ProductionOrder[] | undefined>;
  findComponentsSMTMaterial(
    list_code: string
  ): Promise<ProductionOrder[] | undefined>;

  finishOpList(
    id: number
  ): Promise<ProductionOrder[] | undefined>;

  findByOPsWithComposition(): Promise<ProductionOrder[]>
}
