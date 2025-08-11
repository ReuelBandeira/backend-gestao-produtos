import ICreateProductivityJustificationDTO, { IFindProductivityJustificationDTO } from '@modules/productivity_justification/dtos/ICreateProductivityJustificationDTO';
import IProductivityJustificationRepository from '@modules/productivity_justification/repositories/IProductivityJustificationRepository';
import { Repository, getRepository } from 'typeorm';
import ProductivityJustification from '../entities/ProductivityJustification';

export default class ProductivityJustificationRepository implements IProductivityJustificationRepository {
  private ormRepository: Repository<ProductivityJustification>;

  constructor() {
    this.ormRepository = getRepository(ProductivityJustification);
  }

  public async create(data: ICreateProductivityJustificationDTO): Promise<ProductivityJustification> {
    const productivityJustification = this.ormRepository.create(data);
    await this.ormRepository.save(productivityJustification);

    return productivityJustification;
  }

  public async findByDate(data: IFindProductivityJustificationDTO): Promise<ProductivityJustification[]> {
    return await this.ormRepository.find({
      relations: ['employee', 'line', 'shift'],
      where: {
        day: data.day,
        id_shift: data.id_shift,
        id_line: data.id_line
      }
    })
  }
}
