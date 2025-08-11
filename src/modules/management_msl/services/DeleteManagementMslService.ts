import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ManagementMsl from '../infra/typeorm/entities/ManagementMsl';
import IManagementMslRepository from '../repositories/IManagementMslRepository';

@injectable()
export default class DeleteManagementMslService {
  constructor(
    @inject('ManagementMslRepository')
    private managementMslRepository: IManagementMslRepository
  ) {}

  async execute(id: number): Promise<ManagementMsl> {
    const managementMsl = await this.managementMslRepository.findById(id);

    if (!managementMsl) {
      throw new AppError(`O componente com o id: ${id}, não existe.`, 404);
    }

    await this.managementMslRepository.delete(id);

    return managementMsl;
  }
}
