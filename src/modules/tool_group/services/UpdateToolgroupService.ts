import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Toolgroup from '../infra/typeorm/entities/Toolgroup';
import IToolgroupRepository from '../repositories/IToolgroupRepository';

interface IRequest {
  id: number;
  toolgroup_name: string;
  description_toolgroup: string;
  isStencil: boolean;
}

@injectable()
export default class UpdateToolgroupService {
  constructor(
    @inject('ToolgroupRepository')
    private toolgroupRepository: IToolgroupRepository,
  ) {}

  async execute({
    id,
    toolgroup_name,
    description_toolgroup,
    isStencil
  }: IRequest): Promise<void> {

    const toolgroupUpate = await this.toolgroupRepository.findById(
      id,
    );

    if (!toolgroupUpate) {
      throw new AppError(`O grupo: ${toolgroup_name} não existe.`);
    }

    await this.toolgroupRepository.update(
      id,
      toolgroup_name,
      description_toolgroup,
      isStencil
    );

  }
}
