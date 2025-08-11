import ICreateCauseCategoryDTO from '@modules/category_cause_downtime/dtos/ICreateCauseCategoryDTO';
import ICauseCategoryDowntimeRepository from '@modules/category_cause_downtime/repositories/ICauseCategoryDowntimeRepository';
import DowntimeManagement from '@modules/downtime_management/infra/typeorm/entities/DowntimeManagement';
import { getRepository, Like, Repository } from 'typeorm';
import Cause from '../entities/CauseCategory';
import CauseDwontime from '@modules/cause_downtime/infra/typeorm/entities/Cause';

const TOTAL_PER_PAGE = 11;

export default class CauseCategoryDowntimeRepository implements ICauseCategoryDowntimeRepository {
  private ormRepository: Repository<Cause>;

  private ormDowntimeManagementRepository: Repository<DowntimeManagement>;

  private ormCauseDowntimeRepository: Repository<CauseDwontime>;


  constructor() {
    this.ormRepository = getRepository(Cause);
    this.ormDowntimeManagementRepository = getRepository(DowntimeManagement);
    this.ormCauseDowntimeRepository = getRepository(CauseDwontime);
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
      where: { description: Like(`%${description}%`) },
    });

    return cause;
  }

  public async create(causeData: ICreateCauseCategoryDTO): Promise<Cause> {
    const cause = this.ormRepository.create(causeData);
    await this.ormRepository.save(cause);

    return cause;
  }

  public async update(causeData: Cause): Promise<Cause> {
    const cause = await this.ormRepository.save(causeData);
    return cause;
  }

  public async findAllCauses(page = 1,): Promise<Cause | Cause[]> {
    const cause_category = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalCauses = (await this.ormRepository.find()).length;

    return {
      cause_category,
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
      order: { id: 'DESC' },

    });
    return cause;
  }

  public async deleteValidation(
    id_category_cause : number,
  ): Promise<CauseDwontime[] > {
    const validation = await this.ormCauseDowntimeRepository
      .createQueryBuilder('cause_downtime')
      .select([
        'description'
      ])
      .where({id_category_cause })
      .getRawMany();

    return validation;
  }



}
