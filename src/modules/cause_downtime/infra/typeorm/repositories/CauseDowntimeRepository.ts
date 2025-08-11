import ICreateCauseDTO from '@modules/cause/dtos/ICreateCauseDTO';
import ICauseDowntimeRepository from '@modules/cause_downtime/repositories/ICauseDowntimeRepository';
import DowntimeManagement from '@modules/downtime_management/infra/typeorm/entities/DowntimeManagement';
import MaintenanceFeeder from '@modules/maintenance_feeder/infra/typeorm/entities/MaintenanceFeeder';
import { getRepository, Like, Repository } from 'typeorm';
import Cause from '../entities/Cause';

const TOTAL_PER_PAGE = 11;

export default class CauseDowntimeRepository implements ICauseDowntimeRepository {
  private ormRepository: Repository<Cause>;

  private ormMaintenanceRepository: Repository<MaintenanceFeeder>;

  private ormDowntimeManagementRepository: Repository<DowntimeManagement>;


  constructor() {
    this.ormRepository = getRepository(Cause);
    this.ormMaintenanceRepository = getRepository(MaintenanceFeeder);
    this.ormDowntimeManagementRepository = getRepository(DowntimeManagement);
  }

  public async findById(id: number): Promise<Cause | undefined> {
    const cause = await this.ormRepository.findOne({
      where: { id },
    });

    return cause;
  }

  public async findByName(description: string): Promise<Cause | undefined> {
    const cause = await this.ormRepository.findOne({
      where: { description }
    });

    return cause;
  }

  public async findByNameSearch(
    description: string,
  ): Promise<(Cause | undefined)[] | undefined> {
    const cause = await this.ormRepository.find({
      relations: ['causeCategory'],
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

  public async findAllCauses(page = 1,): Promise<Cause | Cause[]> {
    const cause = await this.ormRepository.find({

      relations: ['causeCategory'],
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



  public async delete(
    id: number
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Cause)
      .where({ id})
      .execute();
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<Cause | Cause[]> {
    const cause = await this.ormRepository.find({
      relations: ['causeCategory'],
      order: { id: 'DESC' },

    });
    return cause;
  }

  public async deleteValidation(
    id_cause: number,
  ): Promise<DowntimeManagement[] > {
    const validation = await this.ormDowntimeManagementRepository
      .createQueryBuilder('dowtime_management')
      .select([
        'id',
        'id_cause'
      ])
      .where({id_cause})
      .getRawMany();

    return validation;
  }



}
