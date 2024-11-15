import AppError from '@shared/errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { validate } from 'class-validator';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  name: string;
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private CategoryRepository: ICategoryRepository
  ) {}

  async execute({ name }: IRequest): Promise<Category> {
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

    const checkDescriptionExist = await this.CategoryRepository.findByName(
      name
    );

    if (checkDescriptionExist) {
      throw new AppError(`Essa categoria já existe`);
    }

    const categorys = await this.CategoryRepository.create({
      name,
    });

    return categorys;
  }
}
