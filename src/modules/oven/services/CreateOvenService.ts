import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Oven from '../infra/typeorm/entities/Oven';
import IOvenRepository from '../repositories/IOvenRepository';

interface IRequest {
  oven_code: string;
  description: string;
  type_oven: string;
  qty_zones: number;
  qty_pressure: number;
  id_employee: number;
}

@injectable()
export default class CreateOvenService {
  constructor(
    @inject('OvenRepository')
    private OvenRepository: IOvenRepository,
  ) {}

  async execute({oven_code,description,type_oven,qty_zones,qty_pressure,id_employee}: IRequest): Promise<Oven> {

    const checkDescriptionExist = await this.OvenRepository.findByName(oven_code);

    if (checkDescriptionExist) {
      throw new AppError(`Esse Forno já existe`);
    }

    const oven = await this.OvenRepository.create({
      oven_code,description,type_oven,qty_zones,qty_pressure,id_employee
    });

    return oven;
  }
}
