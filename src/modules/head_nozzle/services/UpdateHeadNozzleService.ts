/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import HeadNozzle from '../infra/typeorm/entities/HeadNozzle';
import IHeadNozzleRepository from '../repositories/IHeadNozzleRepository';

interface IRequest {
  id: number;
  id_model: number;
  serial_number: string;
}

@injectable()
export default class UpdateHeadNozzleService {
  constructor(
    @inject('HeadNozzleRepository')
    private HeadNozzleRepository: IHeadNozzleRepository,
  ) {}

  async execute({ id,id_model,serial_number}: IRequest): Promise<HeadNozzle> {

    // eslint-disable-next-line no-shadow
    const HeadNozzle = await this.HeadNozzleRepository.findById(id);


    if (!HeadNozzle) {
      throw new AppError(`Este cadastro: ${id} não existe`);
    }


    Object.assign(HeadNozzle, {
      id_model,
      serial_number
    });

    await this.HeadNozzleRepository.update(HeadNozzle);

    return HeadNozzle;
  }
}
