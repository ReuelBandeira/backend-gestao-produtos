/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
import AppError from '@shared/errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { validate } from 'class-validator';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  id: number;
  name: string;
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private CategoryRepository: ICategoryRepository
  ) {}

  async execute({ id, name }: IRequest): Promise<Category> {
    const category = new Category();
    category.name = name;

    // Validação da entidade
    const errors = await validate(category);
    if (errors.length > 0) {
      // Formate os erros para uma mensagem compreensível
      const errorMessages = errors
        .map((err) => {
          // Use o operador de coalescência nula para garantir que constraints não seja undefined
          const constraints = err.constraints || {};
          return Object.values(constraints);
        })
        .flat()
        .join(', ');

      throw new AppError(`Validation failed: ${errorMessages}`, 400);
    }
    const categorys = await this.CategoryRepository.findById(id);

    if (!categorys) {
      throw new AppError(`Está categoria: ${id} não existe`);
    }

    Object.assign(categorys, {
      name,
    });

    await this.CategoryRepository.update(categorys);

    return categorys;
  }
}
