/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Cause from '../infra/typeorm/entities/CauseCategory';
import ICauseCategoryDowntimeRepository from '../repositories/ICauseCategoryDowntimeRepository';


interface IRequest {
  id: number;
  description: string;
}

@injectable()
export default class UpdateCauseCategoryService {
  constructor(
    @inject('CauseCategoryDowntimeRepository')
    private causeCategoryDowntimeRepository: ICauseCategoryDowntimeRepository,
  ) {}

  async execute({ id, description }: IRequest): Promise<Cause> {
    const cause = await this.causeCategoryDowntimeRepository.findById(id);

    if (!cause) {
      throw new AppError(`Está causa: ${description} não existe`);
    }

    Object.assign(cause, {
      description,
    });

    await this.causeCategoryDowntimeRepository.update(cause);

    return cause;
  }
}
