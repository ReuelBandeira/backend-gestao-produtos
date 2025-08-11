import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ToolingControl from '../infra/typeorm/entities/ToolingControl';
import IToolingControlRepository from '../repositories/IToolingControlRepository';

interface IRequest {
  id_toolgroup: number;
  id_product: number;
  description_tooling_control: string;
  amount_used: number,
  usage_limit: number;
}

@injectable()
export default class CreateToolingControlService {
  constructor(
    @inject('ToolingControlRepository')
    private tooling_controlRepository: IToolingControlRepository,
  ) { }

  async execute({
    id_toolgroup,
    id_product,
    description_tooling_control,
    amount_used,
    usage_limit
  }: IRequest): Promise<ToolingControl> {

    const checkToolgroupExist = await this.tooling_controlRepository.findByToolgroupBBName(
      description_tooling_control,
      id_product
    );

    if (checkToolgroupExist) {
      throw new AppError(`Este produto já está cadastrado com esta ferramenta. Favor verificar!`);
    }

    const tooling_control = await this.tooling_controlRepository.create({
      id_toolgroup,
      id_product,
      description_tooling_control,
      amount_used,
      usage_limit
    });

    return tooling_control;
  }
}
