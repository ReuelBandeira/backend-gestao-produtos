import PlateWashing from '@modules/plate_washing/infra/typeorm/entities/PlateWashing';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPlateWashingRepository from '../repositories/IPlateWashingRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeletePlateWashingService {
  constructor(
    @inject('PlateWashingRepository')
    private plateWashingRepository: IPlateWashingRepository,
  ) {}

  async execute({ id }: IRequest): Promise<PlateWashing> {


    const PlateWashing = await this.plateWashingRepository.findById(id);

    if (!PlateWashing) {
      throw new AppError(`A lavagem de placa com o id: ${id} não existe.`);
    }

    await this.plateWashingRepository.delete(id);

    return PlateWashing;
  }
}
