import HeadNozzle from '@modules/head_nozzle/infra/typeorm/entities/HeadNozzle';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHeadNozzleRepository from '../repositories/IHeadNozzleRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteHeadNozzleService {
  constructor(
    @inject('HeadNozzleRepository')
    private HeadNozzleRepository: IHeadNozzleRepository,
  ) {}

  async execute({ id }: IRequest): Promise<HeadNozzle> {

    // eslint-disable-next-line no-shadow
    const HeadNozzle= await this.HeadNozzleRepository.findById(id);

    if (!HeadNozzle) {
      throw new AppError(`Esse cadastro com id: ${id} não existe.`);
    }

    await this.HeadNozzleRepository.delete(id);

    return HeadNozzle;
  }
}
