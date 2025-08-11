/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MaterialEntrance from '../infra/typeorm/entities/MaterialEntrance';
import IMaterialEntranceRepository from '../repositories/IMaterialEntranceRepository';

interface IRequest {
  id: number;
  production_order: string;
  id_employee: number;
}

@injectable()
export default class UpdateMaterialEntranceService {
  constructor(
    @inject('MaterialEntranceRepository')
    private materialEntranceRepository: IMaterialEntranceRepository,
  ) {}

  async execute({ id,production_order,id_employee}: IRequest): Promise<MaterialEntrance> {
    const action = await this.materialEntranceRepository.findById(id);


    if (!action) {
      throw new AppError(`O material com id: ${id} não existe!`);
    }


    Object.assign(action, {
      production_order,
      id_employee
    });

    await this.materialEntranceRepository.update(action);

    return action;
  }
}
