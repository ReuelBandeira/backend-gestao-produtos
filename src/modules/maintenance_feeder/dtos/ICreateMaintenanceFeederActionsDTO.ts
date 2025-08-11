
import MaintenanceFeederActions from '../infra/typeorm/entities/MaintenanceFeederActions';



export default interface ICreateMaintenanceFeederActionsDTO {
  id_maintenance_feeder:number;
  id_action: number;
  id_employee:number;
}
export interface MaintenanceFeederActionsPagination {
  maintenanceFeederActions: MaintenanceFeederActions[];
  totalmaintenanceFeederActions: number;
  totalPages: number;
}
