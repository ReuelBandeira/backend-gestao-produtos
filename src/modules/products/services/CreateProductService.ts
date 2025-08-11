import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({
    product_name,
    description,
    type_side,
    exception,
    side_init,
    number_plates_panel,
    client,
    code_pcba,
    type_plate,
    amount_parent,
    id_family
  }: ICreateProductDTO): Promise<Product> {
    const checkIfProductNameExist =
      await this.productRepository.findByProductName(product_name);

    if (checkIfProductNameExist) {
      throw new AppError(`Este produto já existe.`);
    }

    const product = await this.productRepository.create({
      product_name,
      description,
      type_side,
      exception,
      side_init,
      number_plates_panel,
      client,
      tag: code_pcba,
      code_pcba,
      type_plate,
      amount_parent,
      id_family
    });

    return product;
  }
}
