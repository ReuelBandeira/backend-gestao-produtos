import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateOriginDTO from '../dtos/ICreateOriginDTO';
import Origin from '../infra/typeorm/entities/Origin';
import IOriginRepository from '../repositories/IOriginRepository';

@injectable()
export default class CreateOriginService {
  constructor(
    @inject('OriginRepository')
    private originRepository: IOriginRepository,
  ) {}

  async execute(data: ICreateOriginDTO): Promise<Origin> {
    const checkCodeExist = await this.originRepository.findByCode(data.code);

    if (checkCodeExist) {
      throw new AppError('Código origem já existe', 404);
    }

    return await this.originRepository.create(data);
  }
}
