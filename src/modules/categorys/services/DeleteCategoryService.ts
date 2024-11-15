// eslint-disable-next-line import/no-unresolved
import Category from '@modules/categorys/infra/typeorm/entities/Category';
// eslint-disable-next-line import/no-unresolved
import AppError from '@shared/errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
// eslint-disable-next-line import/no-unresolved
import IProductRepository from '@modules/products/repositories/IProductsRepository';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  id: number;
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private CategoryRepository: ICategoryRepository,

    @inject('ProductRepository')
    private productsRepository: IProductRepository
  ) {}

  async execute({ id }: IRequest): Promise<Category> {
    const validationDelete = await this.productsRepository.findByCategory(id);

    if (validationDelete.length) {
      throw new AppError(
        `A categoria com o id: ${id} não pode ser excluída porque está associada a um ou mais produtos.`
      );
    }

    const categorys = await this.CategoryRepository.findById(id);

    if (!categorys) {
      throw new AppError(`A categoria com o id: ${id} não existe.`);
    }

    await this.CategoryRepository.delete(id);

    return categorys;
  }
}
