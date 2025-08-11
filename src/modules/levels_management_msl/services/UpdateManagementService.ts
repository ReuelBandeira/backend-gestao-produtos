/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import management from '../infra/typeorm/entities/Management';
import IManagementRepository from '../repositories/IManagementRepository';

interface IRequest {
  id: number;
  type: string;
  hours: number;
  percentage: number;
  time_baking: number;
}

@injectable()
export default class UpdatemanagementService {
  constructor(
    @inject('ManagementRepository')
    private managementRepository: IManagementRepository
  ) {}

  async execute({
    id,
    type,
    hours,
    percentage,
    time_baking,
  }: IRequest): Promise<management> {
    // eslint-disable-next-line no-shadow
    const management = await this.managementRepository.findById(id);

    if (!management) {
      throw new AppError(`Está getão: ${type} não existe`);
    }

    Object.assign(management, {
      type,
      hours,
      percentage,
      time_baking,
    });

    await this.managementRepository.update(management);

    return management;
  }
}
