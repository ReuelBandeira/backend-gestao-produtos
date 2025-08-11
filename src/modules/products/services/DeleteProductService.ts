import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProductionOrdersRepository from 'modules/production_orders/repositories/IProductionOrdersRepository';
import IProductRepository from '../repositories/IProductRepository';


interface IRequest {
  id: number;

}

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('ProductionOrdersRepository')
    private productionOrdersRepository: IProductionOrdersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const product = await this.productRepository.findById(id);

    const productOrdem = await this.productionOrdersRepository.findByIdProduct(id);

    if (productOrdem){
      throw new AppError ('Esse produto está vinculado a uma Ordem de Produção')
    }

    if (!product) {
      throw new AppError(`Esse produto não existe.`);
    }

    await this.productRepository.delete(id);
  }



}


