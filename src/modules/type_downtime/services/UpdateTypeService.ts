/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Type from '../infra/typeorm/entities/Type';
import ITypeRepository from '../repositories/ITypeRepository';

interface IRequest {
  id: number;
  description: string;
}

@injectable()
export default class UpdateTypeService {
  constructor(
    @inject('TypeRepository')
    private causeRepository: ITypeRepository,
  ) {}

  async execute({ id, description }: IRequest): Promise<Type> {
    const type = await this.causeRepository.findById(id);

    if (!type) {
      throw new AppError(`Este tipo: ${description} não existe`);
    }


    Object.assign(type, {
      description,
    });

    await this.causeRepository.update(type);

    return type;
  }
}
