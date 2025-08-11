import Model from '@modules/model/infra/typeorm/entities/Model';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IModelRepository from '../repositories/IModelRepository';
import IHeadNozzleRepository from '@modules/head_nozzle/repositories/IHeadNozzleRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteModelService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelRepository,
    @inject('HeadNozzleRepository')
    private HeadNozzleRepository: IHeadNozzleRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Model> {

    const checkExist= await this.HeadNozzleRepository.findById(id);

    if (!checkExist) {
      throw new AppError(`Esse cadastro não pode ser excluído, pois encontra-se em uso.`);
    }


    const model= await this.modelRepository.findById(id);

    if (!model) {
      throw new AppError(`O modelo com o id: ${id} não existe.`);
    }

    await this.modelRepository.delete(id);

    return model;
  }
}
