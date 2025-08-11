/* eslint-disable no-param-reassign */
import IManagementRepository from '@modules/levels_management_msl/repositories/IManagementRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateManagementMslDTO } from '../dtos/IUpdateManagementMslDTO';
import ManagementMsl from '../infra/typeorm/entities/ManagementMsl';
import IManagementMslRepository from '../repositories/IManagementMslRepository';

@injectable()
export default class UpdateManagementMslService {
  constructor(
    @inject('ManagementMslRepository')
    private managementMslRepository: IManagementMslRepository,

    @inject('ManagementRepository')
    private managementRepository: IManagementRepository
  ) {}

  async execute({
    id_level_msl,
    id,
    id_employee,
  }: IUpdateManagementMslDTO): Promise<ManagementMsl> {
    const managementMsl = await this.managementMslRepository.findById(id);

    if (!managementMsl) {
      throw new AppError('Componente não encontrado', 404);
    }

    const levelMsl = await this.managementRepository.findById(id_level_msl);

    if (!levelMsl) {
      throw new AppError('Componente não encontrado', 404);
    }

    Object.assign(managementMsl, {
      id_level_msl,
      id_employee,
    });

    return await this.managementMslRepository.update(managementMsl);
  }
}
