import ICreateCauseDTO from '@modules/cause/dtos/ICreateCauseDTO';
import ICauseRepository from '@modules/cause/repositories/ICauseRepository';
import MaintenanceFeeder from '@modules/maintenance_feeder/infra/typeorm/entities/MaintenanceFeeder';
import { getRepository, Like, Repository } from 'typeorm';
import Cause from '../entities/Cause';

const TOTAL_PER_PAGE = 11;

export default class CauseRepository implements ICauseRepository {
  private ormRepository: Repository<Cause>;

  private ormMaintenanceRepository: Repository<MaintenanceFeeder>;

  constructor() {
    this.ormRepository = getRepository(Cause);
    this.ormMaintenanceRepository = getRepository(MaintenanceFeeder);
  }

  public async findAllCausesNotPaginate(): Promise<Cause[]> {
    return await this.ormRepository.find({
      order: {
        description: 'ASC',
      },
    });
  }

  public async findById(id: number): Promise<Cause | undefined> {
    const cause = await this.ormRepository.findOne({
      where: { id },
    });

    return cause;
  }

  public async findByName(description: string): Promise<Cause | undefined> {
    const cause = await this.ormRepository.findOne({
      where: { description },
    });

    return cause;
  }

  public async findByCode(code: string): Promise<Cause | undefined> {
    const cause = await this.ormRepository.query(
      `${'SELECT * FROM cause  where code = "'}${code}"`
    );
    return cause;
  }

  public async findByNameSearch(
    description: string
  ): Promise<(Cause | undefined)[] | undefined> {
    const cause = await this.ormRepository.find({
      where: { description: Like(`%${description}%`) },
    });

    return cause;
  }

  public async create(causeData: ICreateCauseDTO): Promise<Cause> {
    const cause = this.ormRepository.create(causeData);
    await this.ormRepository.save(cause);

    return cause;
  }

  public async update(causeData: Cause): Promise<Cause> {
    const cause = await this.ormRepository.save(causeData);
    return cause;
  }

  public async findAllCauses(page = 1): Promise<Cause | Cause[]> {
    const cause = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalCauses = (await this.ormRepository.find()).length;

    return {
      cause,
      totalPages: totalCauses / TOTAL_PER_PAGE,
      totalCauses,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllTypeFeeder(): Promise<Cause | Cause[]> {
    const cause = await this.ormRepository.find({
      order: { id: 'DESC' },
      where: {
        type: 'type_feeder',
      },
    });
    return cause;
  }

  public async deleteValidation(
    id_cause: number
  ): Promise<MaintenanceFeeder[]> {
    const validation = await this.ormMaintenanceRepository
      .createQueryBuilder('maintenance_feeder')
      .select(['id', 'id_feeders', 'id_cause ', 'type_maintenance'])
      .where({ id_cause })
      .getRawMany();

    return validation;
  }
}
