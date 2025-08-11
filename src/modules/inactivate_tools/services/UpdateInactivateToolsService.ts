/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import InactivateTools from '../infra/typeorm/entities/InactivateTools';
import IInactivateToolsRepository from '../repositories/IInactivateToolsRepository';

interface IRequest {
  id: number,
  id_tooling_control: number;
  reason_tool_inactivation: string;
}

@injectable()
export default class UpdateInactivateToolsService {
  constructor(
    @inject('InactivateToolsRepository')
    private inactivateToolsRepository: IInactivateToolsRepository,
  ) {}

  async execute({ id, id_tooling_control, reason_tool_inactivation }: IRequest): Promise<void> {
   const inactivateTools = await this.inactivateToolsRepository.findByToolingControlName(id);

    if (!inactivateTools) {
      throw new AppError(`Não existe ferramenta inativa com esse código, favor verificar!`);
    }


    await this.inactivateToolsRepository.update(id, id_tooling_control, reason_tool_inactivation);

  }
}
