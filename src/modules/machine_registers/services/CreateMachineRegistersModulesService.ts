import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MachineRegistersModules from '../infra/typeorm/entities/MachineRegistersModules';
import IMachineRegistersModulesRepository from '../repositories/IMachineRegistersModulesRepository';

interface IRequest {
  id_machine_registers:number;
  id_module: number;
  id_employee: number;
}

@injectable()
export default class createMachineRegistersModulesService {
  constructor(
    @inject('MachineRegistersModulesRepository')
    private machineRegistersModulesRepository: IMachineRegistersModulesRepository,
  ) { }

  async execute({
    id_machine_registers,
    id_module,
    id_employee
  }: IRequest): Promise<MachineRegistersModules> {



    const machineRegistersModules = await this.machineRegistersModulesRepository.create_machine_registers_modules({
      id_machine_registers,
      id_module,
      id_employee
    });

    return machineRegistersModules;
  }
}
