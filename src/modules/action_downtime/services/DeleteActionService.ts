import Action from '@modules/action/infra/typeorm/entities/Action';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IActionDowntimeRepository from '../repositories/IActionDowntimeRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteActionService {
  constructor(
    @inject('ActionDowntimeRepository')
    private actionDowntimeRepository: IActionDowntimeRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Action> {


    const validation_delete = await this.actionDowntimeRepository.deleteValidation(id);

    if (validation_delete.length !==0) {
      throw new AppError(`Essa Ação não pode ser excluída,pois encontra-se em uso na Gestão de Downtime.`);
    };


    const Action = await this.actionDowntimeRepository.findById(id);

    if (!Action) {
      throw new AppError(`A ação com o id: ${id} não existe.`);
    }

    await this.actionDowntimeRepository.delete(id);

    return Action;
  }
}
