import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Model from '../infra/typeorm/entities/Model';
import IModelRepository from '../repositories/IModelRepository';

interface IRequest {
  model: string;
  type: string;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelRepository,
  ) {}

  async execute({model,type}: IRequest): Promise<Model> {
    const checkmodelExist = await this.modelRepository.findByName(model,type);

    if (checkmodelExist) {
      throw new AppError(`Esse modelo já existe para esse tipo`);
    }

    const models = await this.modelRepository.create({
      model,
      type
    });

    return models;
  }
}
