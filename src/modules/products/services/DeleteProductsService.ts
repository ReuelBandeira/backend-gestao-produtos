import Product from '@modules/products/infra/typeorm/entities/Products';
import AppError from '@shared/errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: number;
}
@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository
  ) {}

  async execute({ id }: IRequest): Promise<Product> {
    const products = await this.productsRepository.findById(id);

    if (!products) {
      throw new AppError(`O produto com o id: ${id} não existe.`);
    }

    await this.productsRepository.delete(id);

    return products;
  }
}
