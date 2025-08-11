import ICreateTargetDTO from '@modules/targets/dtos/ICreateTargetDTO';
import IPaginateTargetDTO from '@modules/targets/dtos/IPaginateTargetDTO';
import ITargetRepository from '@modules/targets/repositories/ITargetRepository';
import { getRepository, Repository } from 'typeorm';
import Target from '../entities/Target';

const TOTAL_PER_PAGE = 11;

export default class TargetRepository implements ITargetRepository {
  private ormRepository: Repository<Target>;

  constructor() {
    this.ormRepository = getRepository(Target);
  }

  public async findByProductAndLine(
    id_line: number,
    id_product: number
  ): Promise<Target | undefined> {
    return await this.ormRepository.findOne({
      relations: ['product', 'line'],
      where: {
        id_line,
        id_product,
      },
    });
  }

  public async findAllTargetsNotPaginate(): Promise<Target[]> {
    return await this.ormRepository.find({
      relations: ['line', 'product'],
      order: {
        created_at: 'ASC',
      },
    });
  }

  public async findById(id: number): Promise<Target | undefined> {
    return await this.ormRepository.findOne({
      relations: ['product', 'line'],
      where: { id },
    });
  }

  public async findBySearch(product: string): Promise<Target[]> {
    return await this.ormRepository.find({
      relations: ['product', 'line'],
      where: {
        product: {
          product_name: product,
        },
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async create(data: ICreateTargetDTO): Promise<Target> {
    const target = this.ormRepository.create(data);
    await this.ormRepository.save(target);

    return target;
  }

  public async update(data: Target): Promise<Target> {
    return await this.ormRepository.save(data);
  }

  public async findAllTargets(page = 1): Promise<IPaginateTargetDTO> {
    const [targets, totalTargets] = await this.ormRepository.findAndCount({
      relations: ['product', 'line'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    return {
      targets,
      totalPages: totalTargets / TOTAL_PER_PAGE,
      totalTargets,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }
}
