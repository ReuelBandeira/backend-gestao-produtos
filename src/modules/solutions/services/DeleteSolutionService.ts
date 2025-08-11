import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Solution from '../infra/typeorm/entities/Solution';
import ISolutionRepository from '../repositories/ISolutionRepository';

@injectable()
export default class DeleteSolutionService {
  constructor(
    @inject('SolutionRepository')
    private solutionRepository: ISolutionRepository,
  ) {}

  async execute(id: number): Promise<Solution> {
    const solution = await this.solutionRepository.findById(id);

    if (!solution) {
      throw new AppError(`A solução com o id: ${id}, não existe.`, 404);
    }

    await this.solutionRepository.delete(id);

    return solution;
  }
}
