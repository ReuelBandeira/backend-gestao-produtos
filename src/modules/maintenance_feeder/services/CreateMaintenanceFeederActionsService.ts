import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MaintenanceFeederActions from '../infra/typeorm/entities/MaintenanceFeederActions';
import { IMaintenanceFeederActionsRepository } from '../repositories/IMaintenanceFeederActionsRepository';


interface IRequest {
  id_maintenance_feeder:number;
  id_action: number;
  id_employee: number;

}

@injectable()
export default class CreateMaintenanceFeederActionsService {
  constructor(
    @inject('MaintenanceFeederActionsRepository')
    private maintenanceFeederActionsRepository: IMaintenanceFeederActionsRepository,
  ) {}

  async execute({
    id_maintenance_feeder,
    id_action,
    id_employee

  }: IRequest): Promise<MaintenanceFeederActions> {


    const maintenanceFeederActions = await this.maintenanceFeederActionsRepository.create_maintenance_actions({
      id_maintenance_feeder,
      id_action,
      id_employee
    });

    return  maintenanceFeederActions;
  }
}
