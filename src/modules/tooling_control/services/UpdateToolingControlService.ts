import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ToolingControl from '../infra/typeorm/entities/ToolingControl';
import IToolingControlRepository from '../repositories/IToolingControlRepository';

interface IRequest {
  id: number;
  description_tooling_control: string;

}

@injectable()
export default class UpdateToolingControlService {
  constructor(
    @inject('ToolingControlRepository')
    private tooling_controlRepository: IToolingControlRepository,
  ) {}

  async execute({
    id,
    description_tooling_control,

  }: IRequest): Promise<void> {

    const tooling_controlUpate = await this.tooling_controlRepository.findByToolingControlName(
      id,
    );

    if (!tooling_controlUpate) {
      throw new AppError(`O produto: ${id} não existe.`);
    }

    await this.tooling_controlRepository.update(
      id,
      description_tooling_control
    );

  }
}
