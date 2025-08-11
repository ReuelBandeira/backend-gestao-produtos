/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Model from '../infra/typeorm/entities/Model';
import IModelRepository from '../repositories/IModelRepository';
import IHeadNozzleRepository from '@modules/head_nozzle/repositories/IHeadNozzleRepository';

interface IRequest {
  id: number;
  model: string;
  type: string;
}

@injectable()
export default class UpdateModelService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelRepository,
    @inject('HeadNozzleRepository')
    private HeadNozzleRepository: IHeadNozzleRepository,
  ) {}

  async execute({ id, model, type }: IRequest): Promise<Model> {

    const checkExist= await this.HeadNozzleRepository.findById(id);

    if (!checkExist) {
      throw new AppError(`Esse cadastro não pode ser editado poís encontra-se em uso.`);
    }

    const models = await this.modelRepository.findById(id);

    if (!models) {
      throw new AppError(`Este Modelo: ${model} não existe`);
    }


    Object.assign(models, {
      model,
      type
    });

    await this.modelRepository.update(models);

    return models;
  }
}
