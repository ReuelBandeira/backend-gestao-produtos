/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Oven from '../infra/typeorm/entities/Oven';
import IOvenRepository from '../repositories/IOvenRepository';

interface IRequest {
  id: number;
  oven_code: string;
  description: string;
  type_oven: string;
  qty_zones: number;
  qty_pressure: number;
  id_employee: number;
}

@injectable()
export default class UpdateOvenService {
  constructor(
    @inject('OvenRepository')
    private OvenRepository: IOvenRepository,
  ) {}

  async execute({ id,oven_code,description,type_oven,qty_zones,qty_pressure,id_employee}: IRequest): Promise<Oven> {
    const oven = await this.OvenRepository.findById(id);


    if (!oven) {
      throw new AppError(`Este forno: ${oven_code} não existe`);
    }

    Object.assign(oven, {
      oven_code,description,type_oven,qty_zones,qty_pressure,id_employee
    });

    await this.OvenRepository.update(oven);

    return oven;
  }
}
