import ICreateMachineRegistersModulesDTO, {
  MachineRegistersModulesPagination,
// eslint-disable-next-line import/no-unresolved
} from '@modules/machine_registers/dtos/IMachineRegistersControlModulesDTO';
import IMachineRegistersModulesRepository from '@modules/machine_registers/repositories/IMachineRegistersModulesRepository';
import { getRepository, Like, Repository } from 'typeorm';
import MachineRegistersModules from '../entities/MachineRegistersModules';




const TOTAL_PER_PAGE = 11;

export default class MachineRegistersModulesRepository implements IMachineRegistersModulesRepository {
  private ormRepository: Repository<MachineRegistersModules>;

  constructor() {
    this.ormRepository = getRepository(MachineRegistersModules);
  }

  public async create_machine_registers_modules({
    id_machine_registers,
    id_module,
    id_employee
  }: ICreateMachineRegistersModulesDTO): Promise<MachineRegistersModules> {
    const modules_machine = this.ormRepository.create({
      id_machine_registers,
      id_module,
      id_employee
    });

    await this.ormRepository.save(modules_machine);

    return modules_machine;
  }



}




