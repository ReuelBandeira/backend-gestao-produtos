import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import InactivateTools from '../infra/typeorm/entities/InactivateTools';
import IInactivateToolsRepository from '../repositories/IInactivateToolsRepository';

interface IRequest {
  id_tooling_control: number;
  reason_tool_inactivation: string;

}

@injectable()
export default class CreateInactivateToolsService {
  constructor(
    @inject('InactivateToolsRepository')
    private inactivateToolsRepository: IInactivateToolsRepository,
  ) { }

  async execute({
    id_tooling_control,
    reason_tool_inactivation,
  }: IRequest): Promise<InactivateTools> {

    const checkIdInactivate = await this.inactivateToolsRepository.findByIdToolingControlInactive(id_tooling_control);

    if (checkIdInactivate) {
      throw new AppError(`Esta ferramenta ja está cadastrada como inativa!`);
    }

    const inactivateTools = await this.inactivateToolsRepository.create({
      id_tooling_control,
      reason_tool_inactivation,
    });


    await this.inactivateToolsRepository.findByIdToolingControl(id_tooling_control);

    return inactivateTools;
  }
}
