import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Squeegees } from '../infra/typeorm/entities/Squeegees';
import { ISqueegeeRepository } from '../repositories/ISqueegeeRepository';

interface IRequest {
  description_squeegee: string;
  code_squeegee: string;
  usage_limit: number;
}

@injectable()
export class CreateSqueegeeService {
  constructor(
    @inject('SqueegeeRepository')
    private squeegeeRepository: ISqueegeeRepository
  ) {}

  async execute({
    description_squeegee,
    code_squeegee,
    usage_limit,
  }: IRequest): Promise<Squeegees> {

    const checkCodeSqueegeeExist =
      await this.squeegeeRepository.findByCodeSqueegee(code_squeegee);
    const existCodeSqueegee = checkCodeSqueegeeExist?.length;

    if (existCodeSqueegee !== 0) {
      throw new AppError(
        `Este código já existe ou foi excluído! Favor usar outro código.`
      );
    }

    const squeegee = await this.squeegeeRepository.create({
      description_squeegee,
      code_squeegee,
      usage_limit,
    });

    return squeegee;
  }
}
