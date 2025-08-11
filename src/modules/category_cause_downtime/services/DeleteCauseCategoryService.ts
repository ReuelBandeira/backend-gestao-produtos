import Cause from '@modules/category_cause_downtime/infra/typeorm/entities/CauseCategory';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICauseCategoryDowntimeRepository from '../repositories/ICauseCategoryDowntimeRepository';


interface IRequest {
  id: number;
}

@injectable()
export default class DeleteCauseCategoryService {
  constructor(
    @inject('CauseCategoryDowntimeRepository')
    private causeCategoryDowntimeRepository: ICauseCategoryDowntimeRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Cause> {

    const validation_delete = await this.causeCategoryDowntimeRepository.deleteValidation(id);

    if (validation_delete.length !==0) {
      throw new AppError(`Essa categoria de causa não pode ser excluída,pois encontra-se em uso no cadastro de Causas Downtime.`);
    };

    // eslint-disable-next-line no-shadow
    const cause = await this.causeCategoryDowntimeRepository.findById(id);

    if (!cause) {
      throw new AppError(`A causa  com o id: ${id} não existe.`);
    };

    await this.causeCategoryDowntimeRepository.delete(id);

    return cause;
  }
}
