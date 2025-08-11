import MaintenanceHeadNozzle from '@modules/head_nozzle/infra/typeorm/entities/MaintenanceHeadNozzle';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaintenanceHeadNozzleRepository from '../repositories/IMaintenanceHeadNozzleRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteMaintenanceHeadNozzleService {
  constructor(
    @inject('MaintenanceHeadNozzleRepository')
    private MaintenanceHeadNozzleRepository: IMaintenanceHeadNozzleRepository,
  ) {}

  async execute({ id }: IRequest): Promise<MaintenanceHeadNozzle> {

    // eslint-disable-next-line no-shadow
    const MaintenanceHeadNozzle= await this.MaintenanceHeadNozzleRepository.findById(id);

    if (!MaintenanceHeadNozzle) {
      throw new AppError(`Esse cadastro com id: ${id} não existe.`);
    }

    await this.MaintenanceHeadNozzleRepository.delete(id);

    return MaintenanceHeadNozzle;
  }
}
