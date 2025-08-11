import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProductDelimiterRepository from '../repositories/IProductDelimiterRepository';



interface IRequest {
  id: number;

}

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductDelimiterRepository')
    private productDelimiterRepository: IProductDelimiterRepository,

  ) {}

  async execute({ id }: IRequest): Promise<void> {

    const product = await this.productDelimiterRepository.findById(id);


    if (!product) {
      throw new AppError(`Esse produto não existe.`);
    }

    await this.productDelimiterRepository.delete(id);
  }



}


