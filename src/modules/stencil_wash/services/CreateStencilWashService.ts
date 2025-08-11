import { inject, injectable } from 'tsyringe';
import IToolingControlRepository from '@modules/tooling_control/repositories/IToolingControlRepository';
import AppError from '@shared/errors/AppError';
import IMachineRegistersRepository from '@modules/machine_registers/repositories/IMachineRegistersRepository';
import { getRepository, Repository } from 'typeorm';
import MachineRegisters from '@modules/machine_registers/infra/typeorm/entities/MachineRegisters';
import IStencilWashRepository from '../repositories/IStencilWashRepository';
import ICreateStencilWashDTO from '../dtos/ICreateStencilWashDTO';
import StencilWash from '../infra/typeorm/entities/StencilWash';

@injectable()
export default class CreateStencilWashService {
  private ormRepository: Repository<MachineRegisters>;

  constructor(
    @inject('StencilWashRepository')
    private stencilWashRepository: IStencilWashRepository,

    @inject('ToolingControlRepository')
    private toolingControlRepository: IToolingControlRepository,

    @inject('MachineRegistersRepository')
    private machineRegistersRepository: IMachineRegistersRepository
  ) {
    this.ormRepository = getRepository(MachineRegisters);
  }

  async execute(data: ICreateStencilWashDTO): Promise<StencilWash> {
    const toolingControl =
      await this.toolingControlRepository.findByDescription(
        data.tooling_control
      );
    if (!toolingControl) {
      throw new AppError('Ferramenta não encontrada', 404);
    }

    const machine = await this.ormRepository.findOne({
      where: {
        model: data.machine,
      },
    });

    if (!machine) {
      throw new AppError('Máquina não encontrada', 404);
    }

    return await this.stencilWashRepository.create({
      id_employee: data.id_employee,
      id_tooling_control: toolingControl.id,
      id_machine: machine.id,
    });
  }
}
