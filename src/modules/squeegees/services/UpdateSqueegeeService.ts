/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Squeegees } from '../infra/typeorm/entities/Squeegees';
import { ISqueegeeRepository } from '../repositories/ISqueegeeRepository';

interface IRequest {
  id: number;
  description_squeegee: string;
  usage_limit: number;
}

@injectable()
export class UpdateSqueegeeService {
  constructor(
    @inject('SqueegeeRepository')
    private squeegeeRepository: ISqueegeeRepository
  ) {}

  async execute({
    id,
    description_squeegee,
    usage_limit,
  }: IRequest): Promise<Squeegees> {
    const squeegee = await this.squeegeeRepository.findById(id);
    //
    if (!squeegee) {
      throw new AppError(
        `Este Rodo: ${description_squeegee} não existe! Favor verificar.`
      );
    }

    Object.assign(squeegee, {
      description_squeegee,
      usage_limit,
    });

    await this.squeegeeRepository.update(squeegee);

    return squeegee;
  }
}
