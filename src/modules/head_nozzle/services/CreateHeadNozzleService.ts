import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import HeadNozzle from '../infra/typeorm/entities/HeadNozzle';
import IHeadNozzleRepository from '../repositories/IHeadNozzleRepository';

interface IRequest {
  id_model: number;
  serial_number: string;
}
@injectable()
export default class CreateCouseService {
  constructor(
    @inject('HeadNozzleRepository')
    private HeadNozzleRepository: IHeadNozzleRepository,
  ) {}

  async execute({id_model,serial_number}: IRequest): Promise<HeadNozzle> {
    const checkDescriptionExist = await this.HeadNozzleRepository.findByName(id_model,serial_number);

    if (checkDescriptionExist) {
      throw new AppError(`Esse cadastro já existe`);
    }

    // eslint-disable-next-line no-shadow
    const HeadNozzle = await this.HeadNozzleRepository.create({
      id_model,serial_number
    });

    return HeadNozzle;
  }
}
