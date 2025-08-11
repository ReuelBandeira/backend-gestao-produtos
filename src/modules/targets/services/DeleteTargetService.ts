import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Target from '../infra/typeorm/entities/Target';
import ITargetRepository from '../repositories/ITargetRepository';

@injectable()
export default class DeleteTargetService {
  constructor(
    @inject('TargetRepository')
    private targetRepository: ITargetRepository
  ) {}

  async execute(id: number): Promise<Target> {
    const target = await this.targetRepository.findById(id);

    if (!target) {
      throw new AppError(`A meta com o id: ${id}, não existe.`, 404);
    }

    await this.targetRepository.delete(id);

    return target;
  }
}
