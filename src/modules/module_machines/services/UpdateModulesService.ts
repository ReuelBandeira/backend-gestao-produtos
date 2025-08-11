/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Modules from '../infra/typeorm/entities/Modules';
import IModulesRepository from '../repositories/IModulesRepository';

interface IRequest {
  id: number;
  description: string;
}

@injectable()
export default class UpdateModulesService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
  ) {}

  async execute({ id, description }: IRequest): Promise<Modules> {
    const module = await this.modulesRepository.findById(id);

    if (!module) {
      throw new AppError(`Este tipo: ${description} não existe`);
    }


    Object.assign(module, {
      description,
    });

    await this.modulesRepository.update(module);

    return module;
  }
}
