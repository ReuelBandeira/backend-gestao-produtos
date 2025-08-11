/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Cause from '../infra/typeorm/entities/Cause';
import ICauseDowntimeRepository from '../repositories/ICauseDowntimeRepository';


interface IRequest {
  id: number;
  description: string;
  id_category_cause: number;
}

@injectable()
export default class UpdateCauseService {
  constructor(
    @inject('CauseDowntimeRepository')
    private causeDowntimeRepository: ICauseDowntimeRepository,
  ) {}

  async execute({ id, description,id_category_cause }: IRequest): Promise<Cause> {
    const cause = await this.causeDowntimeRepository.findById(id);

    if (!cause) {
      throw new AppError(`Está causa: ${description} não existe`);
    }

    Object.assign(cause, {
      description,
      id_category_cause
    });

    await this.causeDowntimeRepository.update(cause);

    return cause;
  }
}
