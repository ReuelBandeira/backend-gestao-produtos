import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Squeegees } from '../infra/typeorm/entities/Squeegees';
import { ISqueegeeRepository } from '../repositories/ISqueegeeRepository';

interface IRequest {
  id: number;
}

@injectable()
export class DeleteSqueegeeService {
  constructor(
    @inject('SqueegeeRepository')
    private squeegeeRepository: ISqueegeeRepository
  ) {}

  async execute({ id }: IRequest): Promise<Squeegees> {
    const squeegee = await this.squeegeeRepository.findById(id);

    if (!squeegee) {
      throw new AppError(
        `Este Rodo com o id: ${id} não existe! Favor verificar.`
      );
    }

    await this.squeegeeRepository.delete(id);

    return squeegee;
  }
}
