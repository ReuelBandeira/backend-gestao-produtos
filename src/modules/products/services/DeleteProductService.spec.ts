import AppError from '@shared/errors/AppError';
import { ProductTypeSide } from '../infra/typeorm/entities/Product';
import FakeProductRepository from '../repositories/fakes/FakeProductsRepository';
import DeleteProductService from './DeleteProductService';

let fakeProductRepository: FakeProductRepository;

let deleteProduct: DeleteProductService;

describe('Tests to Delete Product', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    deleteProduct = new DeleteProductService(fakeProductRepository);
  });

  it('This program should be able delete a Product', async () => {
    const { id } = await fakeProductRepository.create({
      product_name: 'MODEL001',
      description: 'Test',
      type_side: ProductTypeSide.DOUBLE,
    });

    const deleteProductFunc = jest.spyOn(fakeProductRepository, 'delete');

    await deleteProduct.execute({ id });

    expect(deleteProductFunc).toBeCalled();
  });

  it('Reject when the product name does not exist', async () => {
    await fakeProductRepository.create({
      product_name: 'MODEL001',
      description: 'Test',
      type_side: ProductTypeSide.DOUBLE,
    });

    await expect(deleteProduct.execute({ id: 10 })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
