
import ICreateSnCompositionDTO from '@modules/sn_composition/dtos/ICreateSnCompositionDTO';
import ISnCompositionRepository from '@modules/sn_composition/repositories/ISnRepository';
import { getRepository, IsNull, Not, Repository } from 'typeorm';
import SnComposition from '../entities/SnComposition';

export default class SnCompositionRepository implements ISnCompositionRepository {
  private ormRepository: Repository<SnComposition>;

  constructor() {
    this.ormRepository = getRepository(SnComposition);
  }

  public async findByProduct(id_product: number): Promise<SnComposition | undefined> {
    return await this.ormRepository.findOne({
      where: [
        {
          id_product
        },
        {
          deleted_at: Not(IsNull())
        }
      ]
    })
  }

  public async findAllSnCompositionsNotPaginate(): Promise<SnComposition[]> {
    return await this.ormRepository.find({
      relations: ['product'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async findById(id: number): Promise<SnComposition | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findBySearch(product_name: string): Promise<SnComposition[]> {
    return await this.ormRepository.find({
      relations: ['product'],
      where: {
        product: {
          product_name
        }
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async create(data: ICreateSnCompositionDTO): Promise<SnComposition> {
    const target = this.ormRepository.create(data);
    await this.ormRepository.save(target);

    return target;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }
}
