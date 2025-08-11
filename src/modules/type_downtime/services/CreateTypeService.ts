import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Type from '../infra/typeorm/entities/Type';
import ITypeRepository from '../repositories/ITypeRepository';

interface IRequest {
  description: string;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) { }

  async execute({ description }: IRequest): Promise<Type> {
    const checkDescriptionExist = await this.typeRepository.findByName(description);


    if (checkDescriptionExist) {
      throw new AppError(`Esse tipo já existe`);
    }


    const type = await this.typeRepository.create({
      description
    });

    return type;
  }
}
