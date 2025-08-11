import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProductDelimiterRepository from '../repositories/IProductDelimiterRepository';
import ProductDelimiter from '../infra/typeorm/entities/ProductDelimiter';


interface IRequest {
  id:number
  // delimiter:string;
  position_quantity:number;
  // type:string;
  id_employee: number;
  // id_product: number
}

@injectable()
export default class UpdateProductDelimiterService {
  constructor(
    @inject('ProductDelimiterRepository')
    private productDelimiterRepository: IProductDelimiterRepository,
  ) {}

  async execute({
    id,
    // delimiter,
    position_quantity,
    // type,
    id_employee,
    // id_product
  }: IRequest): Promise<ProductDelimiter> {

    const productDelimiterUpate = await this.productDelimiterRepository.findById(id);


    if (!productDelimiterUpate) {
      throw new AppError(`Esse cadastro de delimitador não existe.`);
    }



    Object.assign(productDelimiterUpate, {
      // delimiter,
      position_quantity,
      // type,
      id_employee,
    });

    const updateProductDelimiter = await this.productDelimiterRepository.update(productDelimiterUpate);

    return updateProductDelimiter;

  }
}
