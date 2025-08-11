import IManagementRepository from '@modules/levels_management_msl/repositories/IManagementRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateManagementMslDTO from '../dtos/ICreateManagementMslDTO';
import ManagementMsl from '../infra/typeorm/entities/ManagementMsl';
import IManagementMslRepository from '../repositories/IManagementMslRepository';

@injectable()
export default class CreateManagementMslService {
  constructor(
    @inject('ManagementMslRepository')
    private managementMslRepository: IManagementMslRepository,

    @inject('ManagementRepository')
    private managementRepository: IManagementRepository
  ) {}

  async execute({
    component,
    description,
    id_level_msl,
    id_employee,
    fn_factory
  }: ICreateManagementMslDTO): Promise<ManagementMsl> {
    const checkComponentExist = await this.managementMslRepository.findBySearch(
      component
    );

    if (checkComponentExist.length > 0) {
      throw new AppError('Componente já cadastrado.', 400);
    }

    const levelMsl = await this.managementRepository.findById(id_level_msl);

    if (!levelMsl) {
      throw new AppError('Nível de Msl não encontrado.', 404);
    }

    const managementMsl = await this.managementMslRepository.create({
      component,
      description,
      id_level_msl,
      id_employee,
      fn_factory
    });

    return managementMsl;
  }
}
