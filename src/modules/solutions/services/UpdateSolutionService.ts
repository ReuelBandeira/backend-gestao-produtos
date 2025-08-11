/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateSolutionDTO } from '../dtos/IUpdateSolutionDTO';
import Solution from '../infra/typeorm/entities/Solution';
import ISolutionRepository from '../repositories/ISolutionRepository';

@injectable()
export default class UpdateSolutionService {
  constructor(
    @inject('SolutionRepository')
    private solutionRepository: ISolutionRepository,
  ) {}

  async execute({ id, description }: IUpdateSolutionDTO): Promise<Solution> {
    const solution = await this.solutionRepository.findById(id);

    if (!solution) {
      throw new AppError('Esta causa não existe', 404);
    }

    Object.assign(solution, {
      description,
    });

    return await this.solutionRepository.update(solution);
  }
}
