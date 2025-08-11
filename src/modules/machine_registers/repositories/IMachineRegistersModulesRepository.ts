

import ICreateMachineRegistersModulesDTO, {
  MachineRegistersModulesPagination,
} from '../dtos/IMachineRegistersModulesControlDTO';
import MachineRegistersModules from '../infra/typeorm/entities/MachineRegistersModules';

export default interface IMachineRegistersModulesRepository {

  create_machine_registers_modules(data: ICreateMachineRegistersModulesDTO): Promise<MachineRegistersModules>;

}
