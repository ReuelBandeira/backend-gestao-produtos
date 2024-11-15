import { Length, validate } from 'class-validator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Products';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
  expirationDate: string;
  image: string;
  categoryId: number;
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository
  ) {}

  async execute({
    name,
    description,
    price,
    expirationDate,
    image,
    categoryId,
  }: IRequest): Promise<Product> {
    const product = new Product();
    product.name = name;
    product.description = description;

    // Validação da entidade
    const errors = await validate(product);
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

    const checkProductExist = await this.productsRepository.findByName(
      name,
      description
    );

    if (checkProductExist.length !== 0) {
      throw new AppError(`Esse produto já existe`);
    }

    // Verifica se o preço é positivo
    if (price <= 0) {
      throw new AppError('O preço deve ser um valor positivo.');
    }

    const expDate = new Date(`${expirationDate}T00:00:00`);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const expirationDateString = expDate.toLocaleDateString('en-CA');
    const currentDateString = currentDate.toLocaleDateString('en-CA');

    const validationDate = expirationDateString >= currentDateString;

    if (!validationDate) {
      throw new AppError(
        'A data de validade não pode ser anterior à data atual.'
      );
    }

    const products = await this.productsRepository.create({
      name,
      description,
      price,
      expirationDate,
      image,
      categoryId,
    });

    return products;
  }
}
