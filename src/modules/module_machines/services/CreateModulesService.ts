import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Modules from '../infra/typeorm/entities/Modules';
import IModulesRepository from '../repositories/IModulesRepository';

interface IRequest {
  description: string;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
  ) { }

  async execute({ description }: IRequest): Promise<Modules> {
    const checkDescriptionExist = await this.modulesRepository.findByName(description);

    if (checkDescriptionExist) {
      throw new AppError(`Esse Modulo já existe`);
    }


    const module = await this.modulesRepository.create({
      description
    });

    return module;
  }
}
