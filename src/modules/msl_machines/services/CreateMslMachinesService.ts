import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MslMachines from '../infra/typeorm/entities/MslMachines';
import IMslMachinesRepository from '../repositories/IMslMachinesRepository';

interface IRequest {
  machine:string;
  type: string;
  id_employee: number;
}

@injectable()
export default class CreateMslMachinesService {
  constructor(
    @inject('MslMachinesRepository')
    private mslMachinesRepository: IMslMachinesRepository,
  ) {}

  async execute({machine,type,id_employee}: IRequest): Promise<MslMachines> {
    const checkDescriptionExist = await this.mslMachinesRepository.findByName(machine);

    if (checkDescriptionExist) {
      throw new AppError(`Essa maquina já existe`);
    }

    const action = await this.mslMachinesRepository.create({
      machine,
      type,
      id_employee
    });

    return action;
  }
}
