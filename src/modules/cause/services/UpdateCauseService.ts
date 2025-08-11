/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Cause from '../infra/typeorm/entities/Cause';
import ICauseRepository from '../repositories/ICauseRepository';

interface IRequest {
  id: number;
  description: string;
}

@injectable()
export default class UpdateCauseService {
  constructor(
    @inject('CauseRepository')
    private causeRepository: ICauseRepository,
  ) {}

  async execute({ id, description }: IRequest): Promise<Cause> {
    const cause = await this.causeRepository.findById(id);

    if (!cause) {
      throw new AppError(`Está causa: ${description} não existe`);
    }


    Object.assign(cause, {
      description,
    });

    await this.causeRepository.update(cause);

    return cause;
  }
}
