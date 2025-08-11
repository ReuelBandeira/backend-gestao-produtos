/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import PlateWashing from '../infra/typeorm/entities/PlateWashing';
import IPlateWashingRepository from '../repositories/IPlateWashingRepository';

interface IRequest {
  id: number;
  description: string;
}

@injectable()
export default class UpdateActionService {
  constructor(
    @inject('PlateWashingRepository')
    private plateWashingRepository: IPlateWashingRepository,
  ) {}

  async execute({ id, description }: IRequest): Promise<PlateWashing> {
    const plateWashing = await this.plateWashingRepository.findById(id);


    if (!plateWashing) {
      throw new AppError(`Está lavagem de placa: ${description} não existe`);
    }


    Object.assign(plateWashing, {
      description,
    });

    await this.plateWashingRepository.update(plateWashing);

    return plateWashing;
  }
}
