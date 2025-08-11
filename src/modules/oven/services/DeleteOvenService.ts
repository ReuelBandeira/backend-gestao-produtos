import Oven from '@modules/oven/infra/typeorm/entities/Oven';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOvenRepository from '../repositories/IOvenRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteOvenService {
  constructor(
    @inject('OvenRepository')
    private OvenRepository: IOvenRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Oven> {


    // eslint-disable-next-line no-shadow
    const Oven= await this.OvenRepository.findById(id);

    if (!Oven) {
      throw new AppError(`O Forno com o id: ${id} não existe.`);
    }

    await this.OvenRepository.delete(id);

    return Oven;
  }
}
