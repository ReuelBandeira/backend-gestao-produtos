import MslMachines from '../infra/typeorm/entities/MslMachines';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMslMachinesRepository from '../repositories/IMslMachinesRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteMslMachinesService {
  constructor(
    @inject('MslMachinesRepository')
    private mslMachinesRepository: IMslMachinesRepository,
  ) {}

  async execute({ id }: IRequest): Promise<MslMachines> {

    const Action = await this.mslMachinesRepository.findById(id);

    if (!Action) {
      throw new AppError(`A maquina com o id: ${id} não existe.`);
    }

    await this.mslMachinesRepository.delete(id);

    return Action;
  }
}
