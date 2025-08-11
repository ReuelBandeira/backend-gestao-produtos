import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProductionOrdersRepository from '../repositories/IProductionOrdersRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteProductionOderService {
  constructor(
    @inject('ProductionOrdersRepository')
    private productionOrder: IProductionOrdersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const productionOrder = await this.productionOrder.findById(id);

    if (!productionOrder) {
      throw new AppError(`Essa ordem de produção não existe`);
    }

    await this.productionOrder.delete(id, productionOrder?.mo_code);
  }
}
