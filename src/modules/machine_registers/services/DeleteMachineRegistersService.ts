import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IMachineRegistersRepository from '../repositories/IMachineRegistersRepository';


interface IRequest {
  id: number;

}

@injectable()
export default class DeleteMachineRegistersService {
  constructor(
    @inject('MachineRegistersRepository')
    private machineRegistersRepository: IMachineRegistersRepository,

  ) {}

  async execute({ id }: IRequest): Promise<void> {

    const validation_delete = await this.machineRegistersRepository.deleteValidation(id);


    if (validation_delete.length !==0) {
      throw new AppError(`Essa Máquina não pode ser excluída,pois encontra-se em uso na Gestão de Downtime.`);
    };
    const regsiters_machine = await this.machineRegistersRepository.findById(id);

    if (!regsiters_machine) {
      throw new AppError(`Esse cadastro de Máquinas não existe.`);
    }

    await this.machineRegistersRepository.deleteModuleUse(id);

    await this.machineRegistersRepository.delete(id);
  }



}


