/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Origin from '../infra/typeorm/entities/Origin';
import IOriginRepository from '../repositories/IOriginRepository';

interface IUpdateOriginDTO {
  id: number;
  description: string;
  type: string;
}

@injectable()
export default class UpdateOriginService {
  constructor(
    @inject('OriginRepository')
    private originRepository: IOriginRepository,
  ) {}

  async execute({ id, description,type }: IUpdateOriginDTO): Promise<Origin> {
    const origin = await this.originRepository.findById(id);

    if (!origin) {
      throw new AppError('Esta origem não existe', 404);
    }

    Object.assign(origin, {
      description,
      type
    });

    return await this.originRepository.update(origin);
  }
}
