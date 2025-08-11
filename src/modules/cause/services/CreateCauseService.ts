import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Cause, { CauseType } from '../infra/typeorm/entities/Cause';
import ICauseRepository from '../repositories/ICauseRepository';

interface IRequest {
  description: string;
  code: string;
  type: CauseType;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('CauseRepository')
    private causeRepository: ICauseRepository,
  ) { }

  async execute({ description, code, type }: IRequest): Promise<Cause> {
    const checkDescriptionExist = await this.causeRepository.findByName(description);


    if (checkDescriptionExist) {
      throw new AppError(`Essa causa já existe`);
    }

    const checkCodeExist = await this.causeRepository.findByCode(code) as any;

    const checkDel = checkCodeExist.map(function (e: any) {
      return e.deleted_at;
    });

    if (checkDel.length === 1) {
      throw new AppError(`Esse código já existe ou foi excluido! Por favor usar outro código`);
    }

    const cause = await this.causeRepository.create({
      description,
      code,
      type
    });

    return cause;
  }
}
