/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MslMachines from '../infra/typeorm/entities/MslMachines';
import IMslMachinesRepository from '../repositories/IMslMachinesRepository';

interface IRequest {
  id: number;
  type: string;
}

@injectable()
export default class UpdateMslMachinesService {
  constructor(
    @inject('MslMachinesRepository')
    private mslMachinesRepository: IMslMachinesRepository,
  ) {}

  async execute({ id,  type }: IRequest): Promise<MslMachines> {
    const action = await this.mslMachinesRepository.findById(id);

    if (!action) {
      throw new AppError(`Está tipo: ${ type} não existe`);
    }

    Object.assign(action, {
      type,
    });

    await this.mslMachinesRepository.update(action);

    return action;
  }
}
