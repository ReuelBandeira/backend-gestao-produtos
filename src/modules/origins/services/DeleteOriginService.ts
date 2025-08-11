import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Origin from '../infra/typeorm/entities/Origin';
import IOriginRepository from '../repositories/IOriginRepository';

@injectable()
export default class DeleteOriginService {
  constructor(
    @inject('OriginRepository')
    private originRepository: IOriginRepository,
  ) {}

  async execute(id: number): Promise<Origin> {
    const origin = await this.originRepository.findById(id);

    if (!origin) {
      throw new AppError(`A origem com o id: ${id}, não existe.`, 404);
    }

    await this.originRepository.delete(id);

    return origin;
  }
}
