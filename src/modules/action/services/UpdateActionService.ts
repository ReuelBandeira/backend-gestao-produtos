/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Action from '../infra/typeorm/entities/Action';
import IActionRepository from '../repositories/IActionRepository';

interface IRequest {
  id: number;
  description: string;
}

@injectable()
export default class UpdateActionService {
  constructor(
    @inject('ActionRepository')
    private actionRepository: IActionRepository,
  ) {}

  async execute({ id, description }: IRequest): Promise<Action> {
    const action = await this.actionRepository.findById(id);


    if (!action) {
      throw new AppError(`Está ação: ${description} não existe`);
    }


    Object.assign(action, {
      description,
    });

    await this.actionRepository.update(action);

    return action;
  }
}
