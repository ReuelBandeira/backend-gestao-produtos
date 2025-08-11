import MachineRegisters, { StatusType } from '../infra/typeorm/entities/MachineRegisters';


export default interface IMachineRegistersControlDTO {
  model: string;
  description: string;
  manufacturer: string;
  serial_number: string;
  voltage: string;
  id_line: number;
  manufacturing_date:string;
  id_employee:number;
  status:StatusType;
  line_layout:number;



}
export interface MachineRegistersPagination {
  machineRegisters: MachineRegisters[];
  totalMachineRegisters: number;
  totalPages: number;
}
