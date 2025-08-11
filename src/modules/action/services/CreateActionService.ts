import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Action, { ActionType } from '../infra/typeorm/entities/Action';
import IActionRepository from '../repositories/IActionRepository';

interface IRequest {
  description: string;
  code:string;
  type: ActionType;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('ActionRepository')
    private actionRepository: IActionRepository,
  ) {}

  async execute({ description,code,type }: IRequest): Promise<Action> {
    const checkDescriptionExist = await this.actionRepository.findByName(description);

    if (checkDescriptionExist) {
      throw new AppError(`Essa ação já existe`);
    }

    const checkCodeExist = await this.actionRepository.findByCode(code) as any;

    const checkDel = checkCodeExist.map(function (e: any) {
      return e.deleted_at;
    });

    if (checkDel.length === 1) {
      throw new AppError(`Esse código já existe ou foi excluido! Por favor usar outro código`);
    }

    const action = await this.actionRepository.create({
      description,
      code,
      type
    });

    return action;
  }
}
