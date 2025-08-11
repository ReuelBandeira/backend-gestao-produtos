import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Action from '../infra/typeorm/entities/Action';
import IActionDowntimeRepository from '../repositories/IActionDowntimeRepository';

interface IRequest {
  description: string;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('ActionDowntimeRepository')
    private actionDowntimeRepository: IActionDowntimeRepository,
  ) {}

  async execute({description}: IRequest): Promise<Action> {
    const checkDescriptionExist = await this.actionDowntimeRepository.findByName(description);

    if (checkDescriptionExist) {
      throw new AppError(`Essa ação já existe`);
    }

    const action = await this.actionDowntimeRepository.create({
      description,
    });

    return action;
  }
}
