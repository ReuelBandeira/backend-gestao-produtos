import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MaintenanceHeadNozzle from '../infra/typeorm/entities/MaintenanceHeadNozzle';
import IMaintenanceHeadNozzleRepository from '../repositories/IMaintenanceHeadNozzleRepository';

interface IRequest {
  id_head_nozzle: number;
  id_action: number;
  id_cause: number;
  id_defect: number;
  type_maintenance: string;
  id_employee: number;

}
@injectable()
export default class CreateCouseService {
  constructor(
    @inject('MaintenanceHeadNozzleRepository')
    private MaintenanceHeadNozzleRepository: IMaintenanceHeadNozzleRepository,
  ) {}

  async execute({id_head_nozzle,id_action,id_cause,id_defect,type_maintenance,id_employee}: IRequest): Promise<MaintenanceHeadNozzle> {
    // const checkDescriptionExist = await this.MaintenanceHeadNozzleRepository.findByName(id_model,serial_number);

    // if (checkDescriptionExist) {
    //   throw new AppError(`Esse cadastro já existe`);
    // }

    // eslint-disable-next-line no-shadow
    const MaintenanceHeadNozzle = await this.MaintenanceHeadNozzleRepository.create({
      id_head_nozzle,id_action,id_cause,id_defect,type_maintenance,id_employee
    });

    return MaintenanceHeadNozzle;
  }
}
