import Action from '@modules/action/infra/typeorm/entities/Action';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IActionRepository from '../repositories/IActionRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteActionService {
  constructor(
    @inject('ActionRepository')
    private ActionRepository: IActionRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Action> {


    const validation_delete = await this.ActionRepository.deleteValidation(id);



    if (validation_delete.length !==0) {
      throw new AppError(`Essa Ação não pode ser excluída,pois encontra-se em uso na Manutenção de Feeders.`);
    };


    const Action = await this.ActionRepository.findById(id);

    if (!Action) {
      throw new AppError(`A ação com o id: ${id} não existe.`);
    }

    await this.ActionRepository.delete(id);

    return Action;
  }
}
