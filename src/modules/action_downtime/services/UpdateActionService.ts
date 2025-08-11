/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Action from '../infra/typeorm/entities/Action';
import IActionDowntimeRepository from '../repositories/IActionDowntimeRepository';

interface IRequest {
  id: number;
  description: string;
}

@injectable()
export default class UpdateActionService {
  constructor(
    @inject('ActionDowntimeRepository')
    private actionDowntimeRepository: IActionDowntimeRepository,
  ) {}

  async execute({ id, description }: IRequest): Promise<Action> {
    const action = await this.actionDowntimeRepository.findById(id);


    if (!action) {
      throw new AppError(`Está ação: ${description} não existe`);
    }


    Object.assign(action, {
      description,
    });

    await this.actionDowntimeRepository.update(action);

    return action;
  }
}
