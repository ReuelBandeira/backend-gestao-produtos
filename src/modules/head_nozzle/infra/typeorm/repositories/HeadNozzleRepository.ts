import ICreateHeadNozzleDTO from '@modules/head_nozzle/dtos/ICreateHeadNozzleDTO';
import IHeadNozzleRepository from '@modules/head_nozzle/repositories/IHeadNozzleRepository';
import { getRepository, Like, Repository } from 'typeorm';
import HeadNozzle from '../entities/HeadNozzle';

const TOTAL_PER_PAGE = 11;

export default class HeadNozzleRepository implements IHeadNozzleRepository {
  private ormRepository: Repository<HeadNozzle>;

  constructor() {
    this.ormRepository = getRepository(HeadNozzle);

  }

  public async findById(id: number): Promise<HeadNozzle | undefined> {
    // eslint-disable-next-line no-shadow
    const headNozzle = await this.ormRepository.findOne({
      where: { id },
    });

    return headNozzle;
  }

  public async findByName(id_model:number,serial_number: string): Promise<HeadNozzle | undefined> {
    // eslint-disable-next-line no-shadow
    const HeadNozzle = await this.ormRepository.findOne({
      relations: ['model'],
      where: {id_model,serial_number }
    });

    return HeadNozzle;
  }

  public async findByNameSearch(
    serial_number: string,
  ): Promise<(HeadNozzle | undefined)[] | undefined> {
    // eslint-disable-next-line no-shadow
    const HeadNozzle = await this.ormRepository.find({
      relations: ['model'],
      where: { serial_number: Like(`%${serial_number}%`) },
    });

    return HeadNozzle;
  }

  public async create(HeadNozzleData: ICreateHeadNozzleDTO): Promise<HeadNozzle> {
    // eslint-disable-next-line no-shadow
    const HeadNozzle = this.ormRepository.create(HeadNozzleData);
    await this.ormRepository.save(HeadNozzle);

    return HeadNozzle;
  }

  public async update(HeadNozzleData: HeadNozzle): Promise<HeadNozzle> {
    // eslint-disable-next-line no-shadow
    const HeadNozzle = await this.ormRepository.save(HeadNozzleData);
    return HeadNozzle;
  }

  public async findAllHeadNozzle(page=1,): Promise<HeadNozzle | HeadNozzle[]> {
    // eslint-disable-next-line no-shadow
    const HeadNozzle = await this.ormRepository.find({
      relations: ['model'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalHeadNozzle = (await this.ormRepository.find()).length;

    return {
      HeadNozzle,
      totalPages:totalHeadNozzle/ TOTAL_PER_PAGE,
      totalHeadNozzle,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<HeadNozzle| HeadNozzle[]> {
    // eslint-disable-next-line no-shadow
    const HeadNozzle = await this.ormRepository.find({
      relations: ['model'],
      order: { id: 'DESC' },
    });
    return HeadNozzle;
  }

  public async ValidationSerialNumber(
    serial_number: string,
  ): Promise<HeadNozzle[]> {
    const feeders = await this.ormRepository
      .createQueryBuilder()
      .select([
        'id as id_head_nozzle',
      ])
      .where({serial_number})
      .getRawMany();

    return feeders;
  }

}
