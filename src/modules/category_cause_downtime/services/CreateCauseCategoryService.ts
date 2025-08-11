import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Cause from '../infra/typeorm/entities/CauseCategory';
import ICauseCategoryDowntimeRepository from '../repositories/ICauseCategoryDowntimeRepository';

interface IRequest {
  description: string;
}

@injectable()
export default class CreateCouseCategoryService {
  constructor(
    @inject('CauseCategoryDowntimeRepository')
    private causeCategoryDowntimeRepository: ICauseCategoryDowntimeRepository,
  ) { }

  async execute({description}: IRequest): Promise<Cause> {

    const checkDescriptionExist = await this.causeCategoryDowntimeRepository.findByName(description);

    if (checkDescriptionExist) {
      throw new AppError(`Essa categoria já existe`);
    }

    const cause = await this.causeCategoryDowntimeRepository.create({
      description
    });

    return cause;
  }
}
