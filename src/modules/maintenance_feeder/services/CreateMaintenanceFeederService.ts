import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MaintenanceFeeder, { MaintenanceType } from '../infra/typeorm/entities/MaintenanceFeeder';
import {IMaintenanceFeederRepository} from '../repositories/IMaintenanceFeederRepository';

interface IRequest {
  id_feeders:number;
  id_cause:number;
  id_defect: number;
  type_maintenance:MaintenanceType;
  id_employee: number;

}

@injectable()
export default class CreateMaintenanceFeederService {
  constructor(
    @inject('MaintenanceFeederRepository')
    private maintenanceFeederRepository: IMaintenanceFeederRepository,
  ) {}

  async execute({
    id_feeders,
    id_cause,
    id_defect,
    type_maintenance,
    id_employee

  }: IRequest): Promise<MaintenanceFeeder> {


    const maintenanceFeeder = await this.maintenanceFeederRepository.create({
      id_feeders,
      id_cause,
      id_defect,
      type_maintenance,
      id_employee,
    });

    return  maintenanceFeeder;
  }
}
