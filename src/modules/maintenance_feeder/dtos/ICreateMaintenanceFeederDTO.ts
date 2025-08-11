import MaintenanceFeeder from '../infra/typeorm/entities/MaintenanceFeeder';

// eslint-disable-next-line no-shadow
export enum MaintenanceType {
  PREVENTIVE = 'preventive',
  CORRECTIVE = 'corrective',
}

export default interface ICreateMaintenanceFeederDTO {
  id_feeders:number;
  id_cause: number;
  id_defect: number;
  type_maintenance: MaintenanceType;
  id_employee:number;
}
// usado para o merge
export interface MaintenanceFeederPagination {
  maintenanceFeeder: MaintenanceFeeder[];
  totalmaintenanceFeeder: number;
  totalPages: number;
}
