import MachineRegistersModules from '../infra/typeorm/entities/MachineRegistersModules';


export default interface IMachineRegistersControlModulesDTO {
  id_machine_registers: number;
  id_module: number;
  id_employee: number;

}
export interface MachineRegistersModulesPagination {
  machineRegistersmodules: MachineRegistersModules[];
  totalMachineRegistersModules: number;
  totalPages: number;
}
