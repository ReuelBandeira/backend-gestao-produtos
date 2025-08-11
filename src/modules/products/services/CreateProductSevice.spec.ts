import AppError from '@shared/errors/AppError';
import { ProductTypeSide } from '../infra/typeorm/entities/Product';
import FakeProductRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeProductRepository: FakeProductRepository;

let createProduct: CreateProductService;

describe('products', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();

    createProduct = new CreateProductService(fakeProductRepository);
  });

  it('should be create a new Product', async () => {
    const product = await createProduct.execute({
      product_name: 'MODEL001',
      description: 'Test model 001',
      type_side: ProductTypeSide.DOUBLE,
    });

    expect(product.product_name).toBe('MODEL001');
  });

  it('the program does not should be create a Product with the same product name', async () => {
    const product = await fakeProductRepository.create({
      product_name: 'MODEL001',
      description: 'Test model 001',
      type_side: ProductTypeSide.SINGLE,
    });

    await expect(
      createProduct.execute({
        product_name: product.product_name,
        description: 'Test',
        type_side: ProductTypeSide.SINGLE,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
