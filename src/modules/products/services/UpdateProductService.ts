import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product, { ProductTypeSide } from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  product_name: string;
  description: string;
  type_side: ProductTypeSide;
  exception: number;
  side_init: string;
  number_plates_panel: number;

  client?: string;
  type_plate?: string;
  code_pcba?: string;
  tag?: string;
  amount_parent?: number;
  id_family: number;
}

@injectable()
export default class UpdateProductService {
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
  }: IRequest): Promise<Product> {
    const productUpate = await this.productRepository.findByProductName(
      product_name,
    );

    if (!productUpate) {
      throw new AppError(`O produto: ${product_name} não existe.`);
    }

    const tag = code_pcba ? code_pcba.substring(code_pcba.length - 6) : undefined;

    Object.assign(productUpate, {
      product_name,
      description,
      type_side,
      exception,
      side_init,
      number_plates_panel,
      client,
      code_pcba,
      type_plate,
      tag,
      amount_parent,
      id_family
    });

    const updateProduct = await this.productRepository.update(productUpate);

    return updateProduct;
  }
}
