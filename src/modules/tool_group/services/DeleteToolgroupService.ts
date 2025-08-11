import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IToolgroupRepository from '../repositories/IToolgroupRepository';
import IToolingControlRepository from 'modules/tooling_control/repositories/IToolingControlRepository';


interface IRequest {
  id: number;
}

@injectable()
export default class DeleteToolgroupService {
  constructor(
    @inject('ToolgroupRepository')
    private toolgroupRepository: IToolgroupRepository,
    @inject('ToolingControlRepository')
    private ToolingControlRepository: IToolingControlRepository,

  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const toolgroup_name = await this.toolgroupRepository.findById(id);

    const toolgroupToolingcontrol = await this.ToolingControlRepository.findByIdToolgroup(id);

    if (toolgroupToolingcontrol){
      throw new AppError ('Esse grupo está vinculado a uma ferramenta')
    }

    if (!toolgroup_name) {
      throw new AppError(`Esse grupo não existe.`);
    }

    await this.toolgroupRepository.delete(id);
  }

}
