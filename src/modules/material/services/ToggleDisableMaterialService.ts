import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { MaterialManager } from '../infra/typeorm/entities/MaterialManager';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class ToggleDisableMaterialService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<MaterialManager> {
    const findComponent = await this.materialRepository.findById(id);

    if (!findComponent) {
      throw new AppError(`O componente com o id: ${id} não foi encontrado`);
    }

    Object.assign(findComponent, {
      status_component:
        findComponent.status_component === 'online' ? 'offline' : 'online',
    });

    const enableDisable = await this.materialRepository.toggleDisableComponentMaterial(
      findComponent,
    );

    return enableDisable;
  }
}
