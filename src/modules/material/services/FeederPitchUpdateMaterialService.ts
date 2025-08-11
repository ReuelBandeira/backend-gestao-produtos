import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { MaterialManager } from '../infra/typeorm/entities/MaterialManager';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';

interface IRequest {
  id: number;
  feederPitch: number;
}

@injectable()
export default class FeederPitchUpdateMaterialService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
  ) {}

  public async execute({ id, feederPitch }: IRequest): Promise<void> {
    const findComponent = await this.materialRepository.findById(id);

    if (!findComponent) {
      throw new AppError(`O componente com o id: ${id} não foi encontrado`);
    }


    await this.materialRepository.updateFeederPitch(
      id,
      feederPitch
    );

  }
}


