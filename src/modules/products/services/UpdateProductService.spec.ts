import AppError from '@shared/errors/AppError';
import { ProductTypeSide } from '../infra/typeorm/entities/Product';
import FakeProductRepository from '../repositories/fakes/FakeProductsRepository';
import UpdateProductService from './UpdateProductService';

let fakeProductRepository: FakeProductRepository;

let updateProduct: UpdateProductService;

describe('Update Product', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    updateProduct = new UpdateProductService(fakeProductRepository);
  });

  it('should be able create a new Product', async () => {
    const product = await fakeProductRepository.create({
      product_name: 'MODEL001',
      description: 'Updated test',
      type_side: ProductTypeSide.DOUBLE,
    });

    const upated = await updateProduct.execute({
      product_name: product.product_name,
      description: 'Update',
      type_side: ProductTypeSide.SINGLE,
    });

    expect(upated.product_name).toBe('MODEL001');
  });

  it('should be not able create Product that does not exist', async () => {
    await fakeProductRepository.create({
      product_name: 'MODEL001',
      description: 'Updated test',
      type_side: ProductTypeSide.DOUBLE,
    });

    await expect(
      updateProduct.execute({
        product_name: 'MODEL002',
        description: 'Update',
        type_side: ProductTypeSide.SINGLE,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
