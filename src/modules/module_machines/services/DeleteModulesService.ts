import Modules from '@modules/module_machines/infra/typeorm/entities/Modules';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IModulesRepository from '../repositories/IModulesRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteModulesService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Modules> {


    const validation_delete_module = await this.modulesRepository.deleteValidationModule(id);

    if (validation_delete_module.length !==0) {
      throw new AppError(`Esse Modulo não pode ser excluído,pois encontra-se em uso na Gestão de Máquina.`);
    };


    const module = await this.modulesRepository.findById(id);

    if (!module) {
      throw new AppError(`O tipo de modulo com o id: ${id} não existe.`);
    };

    await this.modulesRepository.delete(id);

    return module;
  }
}
