import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SnComposition from '../infra/typeorm/entities/SnComposition';
import ISnCompositionRepository from '../repositories/ISnRepository';

@injectable()
export default class DeleteSnCompositionService {
  constructor(
    @inject('SnCompositionRepository')
    private snCompositionRepository: ISnCompositionRepository
  ) {}

  async execute(id: number): Promise<void> {
    const snComposition = await this.snCompositionRepository.findById(id);

    if (!snComposition) {
      throw new AppError(`A composiçao de sn com o id: ${id}, não existe.`, 404);
    }

    await this.snCompositionRepository.delete(id);
  }
}
