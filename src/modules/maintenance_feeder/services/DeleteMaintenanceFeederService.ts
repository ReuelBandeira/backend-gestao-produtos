import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import {IMaintenanceFeederRepository} from '../repositories/IMaintenanceFeederRepository';


interface IRequest {
  id: number;
}

@injectable()
export default class DeleteMaintenanceFeederService {
  constructor(
    @inject('MaintenanceFeederRepository')
    private maintenanceFeederRepository: IMaintenanceFeederRepository,

  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const maintenance = await this.maintenanceFeederRepository.findById(id);

    if (!maintenance) {
      throw new AppError(`Esse cadastro de manuntenção não existe.`);
    }

    const maintenance_actions_delete = await this.maintenanceFeederRepository.delete_solder_paste(id);

    await this.maintenanceFeederRepository.delete(id,maintenance_actions_delete);
  }

}


