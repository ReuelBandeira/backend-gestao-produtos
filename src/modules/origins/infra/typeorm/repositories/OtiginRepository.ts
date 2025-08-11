import ICreateOriginDTO from '@modules/origins/dtos/ICreateOriginDTO';
import IPaginateOriginDTO from '@modules/origins/dtos/IPaginateOriginDTO';
import IOriginRepository from '@modules/origins/repositories/IOriginRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Origin from '../entities/Origin';

const TOTAL_PER_PAGE = 11;

export default class OriginRepository implements IOriginRepository {
  private ormRepository: Repository<Origin>;

  constructor() {
    this.ormRepository = getRepository(Origin);
  }


  public async findAllOriginsNotPaginate(type: string): Promise<Origin[]> {
    console.log("tipooo",type);
    return await this.ormRepository.find({
      where: {type},
      order: {
        id: 'DESC',
      },
    });
  }

  public async findById(id: number): Promise<Origin | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findByCode(code: string): Promise<Origin | undefined> {
    return await this.ormRepository.findOne({
      where: { code },
    });
  }

  public async findBySearch(code: string): Promise<Origin[]> {
    return await this.ormRepository.find({
      where: { code },
      order: {
        id: 'DESC',
      },
    });
  }

  public async create(data: ICreateOriginDTO): Promise<Origin> {
    const origin = this.ormRepository.create(data);
    await this.ormRepository.save(origin);

    return origin;
  }

  public async update(data: Origin): Promise<Origin> {
    return await this.ormRepository.save(data);
  }

  public async findAllOrigins(page = 1): Promise<IPaginateOriginDTO> {
    const [origins, totalOrigins] = await this.ormRepository.findAndCount({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    return {
      origins,
      totalPages: totalOrigins / TOTAL_PER_PAGE,
      totalOrigins,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }
}
