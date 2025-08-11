import Cause from '@modules/Cause/infra/typeorm/entities/Cause';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICauseRepository from '../repositories/ICauseRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteCauseeService {
  constructor(
    @inject('CauseRepository')
    private CauseRepository: ICauseRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Cause> {
    // eslint-disable-next-line no-shadow

    const validation_delete = await this.CauseRepository.deleteValidation(id);


    if (validation_delete.length !==0) {
      throw new AppError(`Essa Causa não pode ser excluída,pois encontra-se em uso na Manutenção de Feeders.`);
    };

    const Cause = await this.CauseRepository.findById(id);

    if (!Cause) {
      throw new AppError(`O grupo de trabalho com o id: ${id} não existe.`);
    };

    await this.CauseRepository.delete(id);

    return Cause;
  }
}
