

import { StatusType } from '@modules/machine_registers/infra/typeorm/entities/MachineRegisters';
import ICreateDowntimeManagementDTO, {
  DowntimeManagementPagination,
} from '../dtos/IDowntimeManagementDTO';
import DowntimeManagement from '../infra/typeorm/entities/DowntimeManagement';

export default interface IDowntimeManagementRepository {
  findById(id: number): Promise<DowntimeManagement | undefined>;
  findByMachineRegistersName(id: number): Promise<DowntimeManagement | undefined>;
  findByIdToolgroup(id_toolgroup: number): Promise<DowntimeManagement | undefined>;
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  validationCreate(
    model:string,
    description: string,
    manufacturer: string,
    serial_number: string,
    voltage: string,
    id_line: number,
    status:StatusType,
    line_layout:number,
    module:string
    )
    : Promise<DowntimeManagement | undefined>;

  findByProductNameSearch(
    description_tooling_control: string,

  ): Promise<(DowntimeManagementPagination | undefined)[] | undefined>;
  findAllMachines(page: number): Promise<DowntimeManagementPagination | DowntimeManagement[]>;
  create(data: ICreateDowntimeManagementDTO): Promise<DowntimeManagement>;
  delete(id: number): Promise<void>;
//   update(
//     id:number,

//     id_employee:number,
//     final_stop_date:Date,
//     status:string,
//     name_machine:string,
//     comment:string,
//     date_accompanying_checkin:Date,
//     id_cause:number,
//     id_action:number

// ): Promise<void>;

  validationUserType(id_employee:number): Promise<DowntimeManagement | undefined>;
  validationUserTypeLeader(id_employee:number): Promise<DowntimeManagement | undefined>;
  validationUserTypeMonitor(id_employee:number): Promise<DowntimeManagement | undefined>;

  validationCheckMachines(serial_number: string): Promise<DowntimeManagement | undefined>;

  validationSn(serial_number: string): Promise<DowntimeManagement | undefined>;
  validationLayoutLine(id_line:number,line_layout: number,status:StatusType): Promise<DowntimeManagement | undefined>;

//   updateFinalized(
//     id:number,
//     id_employee:number,
//     final_stop_date:Date,
//     status:string,
//     comment:string,
//     id_cause:number,
//     id_action:number

// ): Promise<void>;

updateCheckin(
  id:number,
  id_employee:number,
  status:string,
  date_accompanying_checkin:Date,
): Promise<void>;


}
