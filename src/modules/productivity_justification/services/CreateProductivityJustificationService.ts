import { inject, injectable } from 'tsyringe';
import ICreateProductivityJustificationDTO from '../dtos/ICreateProductivityJustificationDTO';
import ProductivityJustification from '../infra/typeorm/entities/ProductivityJustification';
import IProductivityJustificationRepository from '../repositories/IProductivityJustificationRepository';


@injectable()
export default class CreateProductivityJustificationService {
  constructor(
    @inject('ProductivityJustificationRepository')
    private productivityJustificationRepository: IProductivityJustificationRepository
  ) {}

  async execute(data :ICreateProductivityJustificationDTO): Promise<ProductivityJustification> {

    const productivityJustification = await this.productivityJustificationRepository.create(data);

    return productivityJustification;
  }
}
