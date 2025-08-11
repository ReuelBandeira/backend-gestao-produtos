import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProductDelimiterRepository from '../repositories/IProductDelimiterRepository';
import ICreateProductDelimiterDTO from '../dtos/ICreateProductDelimiterDTO';
import ProductDelimiter from '../infra/typeorm/entities/ProductDelimiter';


interface IRequest {
  id_product:number;
  delimiter:string;
  position_quantity:number;
  type:string;
  id_employee: number;
}


@injectable()
export default class CreateProductDelimiterService {
  constructor(
    @inject('ProductDelimiterRepository')
    private productDelimiterRepository: IProductDelimiterRepository,
  ) {}

  async execute({
      id_product,
      delimiter,
      position_quantity,
      type,
      id_employee


  }: ICreateProductDelimiterDTO): Promise<ProductDelimiter> {


    const checkExist =
      await this.productDelimiterRepository.findByIdDelimiter(id_product,delimiter);

    if (checkExist) {
      throw new AppError(`Este delimitador já existe para o produto informado.`);
    }

    const product_delimiter = await this.productDelimiterRepository.create({
        id_product,
        delimiter,
        position_quantity,
        type,
        id_employee
    });

    return product_delimiter;
  }
}
