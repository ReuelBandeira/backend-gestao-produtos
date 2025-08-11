import ICreatePlateWashingDTO from '../dtos/ICreatePlateWashingDTO';
import PlateWashing from '../infra/typeorm/entities/PlateWashing';

export default interface IPlateWashingRepository {
  findById(id: number): Promise<PlateWashing | undefined>;
  findByNameSearch(
    descriptiom: string,
  ): Promise<(PlateWashing | undefined)[] | undefined>;
  findByName(descriptiom: string): Promise<PlateWashing | undefined>;
  findAllAction(): Promise<PlateWashing | PlateWashing[]>;


  create(data: ICreatePlateWashingDTO): Promise<PlateWashing>;
  update(plateWashingData: PlateWashing): Promise<PlateWashing>;
  delete(id: number): Promise<void>;



  snPlateWashing(
    serial_number: string,
  ): Promise<(PlateWashing | undefined)[] | undefined>;

  snPoMocode(
    mo_code: string,
  ): Promise<(PlateWashing | undefined)[]>;

  findCheckToolPrinter(
    id_production_order: number,
  ): Promise<(PlateWashing | undefined)[] | undefined>;

  findCompSMTmaterialManager(
    code_liste: string,
  ): Promise<(PlateWashing | undefined)[] | undefined>;

  createPlateWashing(data:ICreatePlateWashingDTO[]): Promise<PlateWashing[]>;

  findProductName(
    product_name: string,
  ): Promise<(PlateWashing | undefined)[] | undefined>;

  updateSnDetail(
    serial_number: string,
    // id_work_station:number
  ): Promise<(PlateWashing | undefined)[] | undefined>;

  updateTrackings(
    serial_number: string,
    id_work_station:number
  ): Promise<(PlateWashing | undefined)[] | undefined>;

  updateProductionOrder(
    mo_code: string,
    input_qty:number,
    number_plates_panel:number
  ): Promise<(PlateWashing | undefined)[] | undefined>;

 // adcionado para o router body
  findRouteBody(
    route_head_id: number,
  ): Promise<(PlateWashing | undefined)[] | undefined>;

  updateTrackingsIDobrigatory(
    serial_number: string,
    id_work_station:number,
    id_next_workgroup:number
  ): Promise<(PlateWashing | undefined)[] | undefined>;


}
