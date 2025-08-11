/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import DetailMaterialEntrance from '../infra/typeorm/entities/DetailMaterialEntrance';
import IDetailMaterialEntranceRepository from '../repositories/IDetailMaterialEntranceRepository';

interface IRequest {
  id: number;
  component_quantity: number;
  id_employee: number;
}

@injectable()
export default class UpdateMaterialEntranceService {
  constructor(
    @inject('DetailMaterialEntranceRepository')
    private detailMaterialEntranceRepository: IDetailMaterialEntranceRepository,
  ) {}

  async execute({
    id,
    component_quantity,
    id_employee}: IRequest): Promise<DetailMaterialEntrance> {
    const action = await this.detailMaterialEntranceRepository.findById(id);

    if (!action) {
      throw new AppError(`O material com id: ${id} não existe!`);
    }

    Object.assign( action,{
      component_quantity,
      id_employee
    });

    await this.detailMaterialEntranceRepository.update(action);

    return action;
  }
}
