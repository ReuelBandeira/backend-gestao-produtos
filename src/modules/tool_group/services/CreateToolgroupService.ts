import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateToolgroupDTO from '../dtos/ICreateToolgroupDTO';
import Toolgroup from '../infra/typeorm/entities/Toolgroup';
import IToolgroupRepository from '../repositories/IToolgroupRepository';

@injectable()
export default class CreateToolgroupService {
  constructor(
    @inject('ToolgroupRepository')
    private toolgroupRepository: IToolgroupRepository,
  ) {}

  async execute({
    toolgroup_name,
    description_toolgroup,
    isStencil
  }: ICreateToolgroupDTO): Promise<Toolgroup> {

    const checkToolgroupExist = await this.toolgroupRepository.findByToolgroupBName(
      toolgroup_name,
    );

    if (checkToolgroupExist) {
      throw new AppError(`Esse grupo de ferramentas já existe! `);
    }

    const toolgroup = await this.toolgroupRepository.create({
      toolgroup_name,
      description_toolgroup,
      isStencil
    });

    return toolgroup;
  }
}
