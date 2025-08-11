import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MaintenanceFeeder, { MaintenanceType } from '../infra/typeorm/entities/MaintenanceFeeder';
import {IMaintenanceFeederRepository} from '../repositories/IMaintenanceFeederRepository';

interface IRequest {
  id: number;
  id_feeders:number;
  id_action: number;
  id_cause:number;
  id_defect: number;
  type_maintenance:MaintenanceType;


}

@injectable()
export default class UpdateMaintenanceFeederService {
  constructor(
    @inject('MaintenanceFeederRepository')
    private maintenanceFeederRepository: IMaintenanceFeederRepository,
  ) {}

  async execute({
    id,
    id_feeders,
    id_action,
    id_cause,
    id_defect,
    type_maintenance,

  }: IRequest): Promise<void> {

    const tooling_controlUpate = await this.maintenanceFeederRepository.findByMaintenanceFeederName(
      id,
    );

    if (!tooling_controlUpate) {
      throw new AppError(`Esse cadastro: ${id} não existe.`);
    }

    await this.maintenanceFeederRepository.update(
      id,
      id_feeders,
      id_action,
      id_cause,
      id_defect,
      type_maintenance,
    );

  }
}
