import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateTargetDTO from '../dtos/ICreateTargetDTO';
import Target from '../infra/typeorm/entities/Target';
import ITargetRepository from '../repositories/ITargetRepository';

interface IRequest {
  id_line:number;
  id_product:number;
  target:number;
}

@injectable()
export default class CreateTargetService {
  constructor(
    @inject('TargetRepository')
    private targetRepository: ITargetRepository
  ) {}

  async execute({id_line,id_product,target}:IRequest): Promise<Target> {

    const checkCodeExist = await this.targetRepository.findByProductAndLine(
      id_line,
      id_product
    );

    if (checkCodeExist) {
      throw new AppError('Esse cadastro de meta já existe para o produto informado', 404);
    }

    const targets = await this.targetRepository.create({
      id_line,
      id_product,
      target
    });

    return targets;
  }
}
