/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateTargetnDTO } from '../dtos/IUpdateTargetDTO';
import Target from '../infra/typeorm/entities/Target';
import ITargetRepository from '../repositories/ITargetRepository';

@injectable()
export default class UpdateTargetService {
  constructor(
    @inject('TargetRepository')
    private targetRepository: ITargetRepository
  ) {}

  async execute({ id, target }: IUpdateTargetnDTO): Promise<Target> {
    const tg = await this.targetRepository.findById(id);

    if (!tg) {
      throw new AppError('Esta meta não existe', 404);
    }

    Object.assign(tg, {
      target,
    });

    return await this.targetRepository.update(tg);
  }
}
