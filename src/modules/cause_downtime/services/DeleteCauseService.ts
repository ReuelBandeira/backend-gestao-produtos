import Cause from '@modules/cause_downtime/infra/typeorm/entities/Cause';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICauseDowntimeRepository from '../repositories/ICauseDowntimeRepository';


interface IRequest {
  id: number;
}

@injectable()
export default class DeleteCauseeService {
  constructor(
    @inject('CauseDowntimeRepository')
    private causeDowntimeRepository: ICauseDowntimeRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Cause> {
    // eslint-disable-next-line no-shadow

    const validation_delete = await this.causeDowntimeRepository.deleteValidation(id);


    if (validation_delete.length !==0) {
      throw new AppError(`Essa Causa não pode ser excluída,pois encontra-se em uso na Gestão de Downtime.`);
    };

    // eslint-disable-next-line no-shadow
    const cause = await this.causeDowntimeRepository.findById(id);

    if (!cause) {
      throw new AppError(`A causa  com o id: ${id} não existe.`);
    };

    await this.causeDowntimeRepository.delete(id);

    return cause;
  }
}
