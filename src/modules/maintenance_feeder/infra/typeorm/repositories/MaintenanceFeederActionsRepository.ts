

import { getRepository, Like, Repository } from 'typeorm';
import { Feeder } from '@modules/feeder/infra/typeorm/entities/Feeder';
import ICreateMaintenanceFeederActionsDTO from '@modules/maintenance_feeder/dtos/ICreateMaintenanceFeederActionsDTO';
import { IMaintenanceFeederActionsRepository } from '@modules/maintenance_feeder/repositories/IMaintenanceFeederActionsRepository';
import MaintenanceFeederActions from '../entities/MaintenanceFeederActions';

const TOTAL_PER_PAGE = 11;

export  class MaintenanceFeederActionsRepository implements IMaintenanceFeederActionsRepository {
  private ormRepository: Repository<MaintenanceFeederActions>;


  constructor() {
    this.ormRepository = getRepository(MaintenanceFeederActions);

  }

  public async create_maintenance_actions({
    id_maintenance_feeder,
    id_action,
    id_employee


  }: ICreateMaintenanceFeederActionsDTO): Promise<MaintenanceFeederActions> {
    const maintenace_actions = this.ormRepository.create({
      id_maintenance_feeder,
      id_action,
      id_employee


    });

    await this.ormRepository.save(maintenace_actions);

    return maintenace_actions;
  }


}
