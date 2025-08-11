import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProductionOrdersRepository from 'modules/production_orders/repositories/IProductionOrdersRepository';
import IToolingControlRepository from '../repositories/IToolingControlRepository';


interface IRequest {
  id: number;

}

@injectable()
export default class DeleteToolingControlService {
  constructor(
    @inject('ToolingControlRepository')
    private tooling_controlRepository: IToolingControlRepository,

  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const product = await this.tooling_controlRepository.findById(id);

    if (!product) {
      throw new AppError(`Essa ferramenta não existe.`);
    }

    const statusOnline = await this.tooling_controlRepository.findByIdStatus(id);

    if (statusOnline.length !== 0) {
      throw new AppError(`Essa ferramenta encontra-se em Uso.`);
    }

    await this.tooling_controlRepository.delete(id);
  }



}


