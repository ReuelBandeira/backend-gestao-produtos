import ICreateMaintenanceFeederDTO, {
  MaintenanceFeederPagination, MaintenanceType,
} from '../dtos/ICreateMaintenanceFeederDTO';
import MaintenanceFeeder from '../infra/typeorm/entities/MaintenanceFeeder';

export  interface IMaintenanceFeederRepository {
  findById(id: number): Promise<MaintenanceFeeder | undefined>;
  findByMaintenanceFeederName(id: number): Promise<MaintenanceFeeder | undefined>;

  findByToolgroupBBName(id_feeders:number,id_cause:number,id_defect:number,type_maintenance:MaintenanceType): Promise<MaintenanceFeeder | undefined>;
  findByProductNameSearch(
    id_feeders: number,
    page:number,
  ): Promise<(MaintenanceFeederPagination | undefined)[] | undefined>;

  create(data: ICreateMaintenanceFeederDTO): Promise<MaintenanceFeeder>;
  update(
    id: number,
    id_feeders:number,
    id_cause:number,
    id_defect: number,
    type_maintenance:MaintenanceType,
): Promise<void>;
  delete(id: number): Promise<void>;
  delete_solder_paste(id: number): Promise<MaintenanceFeeder | undefined>;

}
