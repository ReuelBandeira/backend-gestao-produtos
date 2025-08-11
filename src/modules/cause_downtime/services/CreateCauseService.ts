import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Cause, { CauseType } from '../infra/typeorm/entities/Cause';
import ICauseDowntimeRepository from '../repositories/ICauseDowntimeRepository';

interface IRequest {
  description: string;
  id_category_cause: number;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('CauseDowntimeRepository')
    private causeDowntimeRepository: ICauseDowntimeRepository,
  ) { }

  async execute({description,id_category_cause}: IRequest): Promise<Cause> {

    const checkDescriptionExist = await this.causeDowntimeRepository.findByName(description);

    if (checkDescriptionExist) {
      throw new AppError(`Essa causa já existe`);
    }

    const cause = await this.causeDowntimeRepository.create({
      description,
      id_category_cause
    });

    return cause;
  }
}
