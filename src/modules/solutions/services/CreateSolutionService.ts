import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateSolutionDTO from '../dtos/ICreateSolutionDTO';
import Solution from '../infra/typeorm/entities/Solution';
import ISolutionRepository from '../repositories/ISolutionRepository';

@injectable()
export default class CreateSolutionService {
  constructor(
    @inject('SolutionRepository')
    private solutionRepository: ISolutionRepository,
  ) {}

  async execute(data: ICreateSolutionDTO): Promise<Solution> {
    const checkCodeExist = await this.solutionRepository.findByCode(data.code);

    if (checkCodeExist) {
      throw new AppError('Essa solução já existe', 404);
    }

    return await this.solutionRepository.create(data);
  }
}
