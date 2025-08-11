import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import ICreateSolderPasteTimeDTO, {
  SolderPasteTimePagination,
} from '@modules/solder_paste/dtos/ICreateSolderPasteTimeDTO';
import ISolderPasteTimeRepository from '@modules/solder_paste/repositories/ISolderPasteTimeRepository';
import { getRepository, IsNull, Like, Repository } from 'typeorm';

import ConfigureSoldePasteTime from '../entities/ConfigureSoldePasteTime';
import Provider from '../entities/Provider';
import SolderPasteControll from '../entities/SolderPasteControll';

const TOTAL_PER_PAGE = 11;

export default class SolderPasteTimeRepository implements ISolderPasteTimeRepository {
  private ormRepository: Repository<ConfigureSoldePasteTime>;

  private ormProviderRepository: Repository<Provider>;

  private ormEmployeeRepository: Repository<Employee>;

  private ormConfRepository: Repository<ConfigureSoldePasteTime>;

  private ormPasteRepository: Repository<SolderPasteControll>;

  constructor() {
    this.ormRepository = getRepository(ConfigureSoldePasteTime);
    this.ormProviderRepository = getRepository(Provider);
    this.ormEmployeeRepository = getRepository(Employee);
    this.ormConfRepository = getRepository(ConfigureSoldePasteTime);
    this.ormPasteRepository = getRepository(SolderPasteControll);
  }

  public async findAllSolderPasteTime(): Promise<ConfigureSoldePasteTime[]> {
    const solderPasteTime = await this.ormRepository.find();

    return solderPasteTime;
  }

  public async findById(id: number): Promise<ConfigureSoldePasteTime | undefined> {
    const soldePasteTime = await this.ormRepository.findOne({ id });

    return soldePasteTime;
  }

  public async create({
      thaw_time,
      time_use_with_lid_closed,
      time_use_with_lid_open,
      type_paste,
      id_employee,
      id_provider

  }: ICreateSolderPasteTimeDTO): Promise<ConfigureSoldePasteTime> {
    const provider = this.ormRepository.create({
      thaw_time,
      time_use_with_lid_closed,
      time_use_with_lid_open,
      type_paste,
      id_employee,
      id_provider
    });

    await this.ormRepository.save(provider);

    return provider;
  }

  public async findByTypePasteName(
    type_paste: string,
  ): Promise<ConfigureSoldePasteTime | undefined> {
    const findSolder = await this.ormRepository.findOne({

      where: {type_paste},
    });

    return findSolder;
  }

  public async findByTypeProviderName(
    id_provider: number,
  ): Promise<ConfigureSoldePasteTime | undefined> {
    const findSolder = await this.ormRepository.findOne({

      where: {id_provider},
    });

    return findSolder;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  async provider_name(
    id:number
  ): Promise<Provider [] | undefined> {

    const findSolder = await this.ormProviderRepository
      .createQueryBuilder('provider')
      .select([
        'provider_name',
        'description_provider',
        'acronym',
        'id'
      ])
      .where ({id})
      .getRawMany();

    return findSolder;
  }

  async employee_name(
    id:number
  ): Promise<Employee [] | undefined> {

    const findSolder = await this.ormEmployeeRepository
      .createQueryBuilder('employees')
      .select([
        'name',
        'username'
      ])
      .where ({id})
      .getRawMany();

    return findSolder;
  }

  async id_provider_time(
    id: number
  ): Promise<SolderPasteControll [] > {

    const findSolder = await this.ormConfRepository
      .createQueryBuilder('solder_paste_type_time')
      .select([
        'id_provider',
      ])
      .where ({id})
      .getRawMany();

    return findSolder;
  }

  async conf_day(
    id_provider: number
  ): Promise<SolderPasteControll [] > {

    const findSolder = await this.ormConfRepository
      .createQueryBuilder('solder_paste_type_time')
      .select([
        'thaw_time',
      ])
      .where ({id_provider})
      .getRawMany();

    return findSolder;
  }

  public async checkDeleteTimeProvider(
    id_provider: number
  ): Promise<SolderPasteControll[]> {

  const solderPasteControll = await this.ormPasteRepository.find({
    where: {

      datetime_use:IsNull(),
      deleted_at: IsNull(),
      id_provider
    }


  });

  return solderPasteControll;
}






}
