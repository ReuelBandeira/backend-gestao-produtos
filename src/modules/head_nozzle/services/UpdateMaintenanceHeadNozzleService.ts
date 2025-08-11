/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MaintenanceHeadNozzle from '../infra/typeorm/entities/MaintenanceHeadNozzle';
import IMaintenanceHeadNozzleRepository from '../repositories/IMaintenanceHeadNozzleRepository';

interface IRequest {
  id: number;
  id_head_nozzle: number;
  id_action: number;
  id_cause: number;
  id_defect: number;
  type_maintenance: string;
  id_employee: number;
}

@injectable()
export default class UpdateMaintenanceHeadNozzleService {
  constructor(
    @inject('MaintenanceHeadNozzleRepository')
    private MaintenanceHeadNozzleRepository: IMaintenanceHeadNozzleRepository,
  ) {}

  async execute({id,id_head_nozzle,id_action,id_cause,id_defect,type_maintenance,id_employee}: IRequest): Promise<MaintenanceHeadNozzle> {

    // eslint-disable-next-line no-shadow
    const MaintenanceHeadNozzle = await this.MaintenanceHeadNozzleRepository.findById(id);


    if (!MaintenanceHeadNozzle) {
      throw new AppError(`Este cadastro: ${id} não existe`);
    }


    Object.assign(MaintenanceHeadNozzle, {
      id_head_nozzle,id_action,id_cause,id_defect,type_maintenance,id_employee
    });

    await this.MaintenanceHeadNozzleRepository.update(MaintenanceHeadNozzle);

    return MaintenanceHeadNozzle;
  }
}
