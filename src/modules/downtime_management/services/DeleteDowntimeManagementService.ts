import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IDowntimeManagementRepository from '../repositories/IDowntimeManagementRepository';


interface IRequest {
  id: number;

}

@injectable()
export default class DeleteDowntimeManagementService {
  constructor(
    @inject('DowntimeManagementRepository')
    private downtimeManagementRepository: IDowntimeManagementRepository,

  ) {}

  async execute({ id }: IRequest): Promise<void> {

    const regsiters = await this.downtimeManagementRepository.findById(id);

    if (!regsiters) {
      throw new AppError(`Esse Registro de parada não existe.`);
    }

    await this.downtimeManagementRepository.delete(id);
  }



}


