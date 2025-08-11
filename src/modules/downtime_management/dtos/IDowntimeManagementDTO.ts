import DowntimeManagement from '../infra/typeorm/entities/DowntimeManagement';


export default interface IDowntimeManagementDTO {
  id_department: number;
  id_type: number;
  reason: string;
  stop_start_date: Date;
  id_line: number;
  id_machine: number;
  equipment: string;
  id_cause:number;
  module:string;
  final_stop_date:Date;
  status:string;
  name_machine:string;
  id_employee:number;
  zone_type:string;
  post:string;


}
export interface DowntimeManagementPagination {
  downtimeManagement: DowntimeManagement[];
  totalDowntimeManagement: number;
  totalPages: number;
}
