import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Management from '../infra/typeorm/entities/Management';
import IManagementRepository from '../repositories/IManagementRepository';

interface IRequest {
  type: string;
  hours: number;
  percentage: number;
  time_baking: number;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('ManagementRepository')
    private managementRepository: IManagementRepository
  ) {}

  async execute({
    type,
    hours,
    percentage,
    time_baking,
  }: IRequest): Promise<Management> {
    const checkDescriptionExist = await this.managementRepository.findByName(
      type
    );

    if (checkDescriptionExist) {
      throw new AppError(`Esse nível já existe`);
    }

    // eslint-disable-next-line no-shadow
    const management = await this.managementRepository.create({
      type,
      hours,
      percentage,
      time_baking,
    });

    return management;
  }
}
