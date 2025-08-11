
import ITypeRepository from '@modules/type_downtime/repositories/ITypeRepository';
import MaintenanceFeeder from '@modules/maintenance_feeder/infra/typeorm/entities/MaintenanceFeeder';
import { getRepository, Like, Repository } from 'typeorm';
import ICreateTypeDTO from '@modules/type_downtime/dtos/ITypeDTO';
import DowntimeManagement from '@modules/downtime_management/infra/typeorm/entities/DowntimeManagement';
import Type from '../entities/Type';

const TOTAL_PER_PAGE = 11;

export default class TypeRepository implements ITypeRepository {
  private ormRepository: Repository<Type>;

  private ormMaintenanceRepository: Repository<MaintenanceFeeder>;

  private ormDowntimeManagementRepository: Repository<DowntimeManagement>;


  constructor() {
    this.ormRepository = getRepository(Type);
    this.ormMaintenanceRepository = getRepository(MaintenanceFeeder);
    this.ormDowntimeManagementRepository = getRepository(DowntimeManagement);
  }

  public async findById(id: number): Promise<Type | undefined> {
    const type = await this.ormRepository.findOne({
      where: { id },
    });

    return type;
  }

  public async findByName(description: string): Promise<Type | undefined> {
    const type = await this.ormRepository.findOne({
      where: { description }
    });

    return type;
  }


  public async findByNameSearch(
    description: string,
  ): Promise<(Type | undefined)[] | undefined> {
    const type = await this.ormRepository.find({
      where: { description: Like(`%${description}%`) },
    });

    return type;
  }

  public async create(typeData: ICreateTypeDTO): Promise<Type> {
    const type = this.ormRepository.create(typeData);
    await this.ormRepository.save(type);

    return type;
  }

  public async update(typeData: Type): Promise<Type> {
    const type = await this.ormRepository.save(typeData);
    return type;
  }

  public async findAllType(page = 1,): Promise<Type | Type[]> {
    const type = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalType = (await this.ormRepository.find()).length;

    return {
      type,
      totalPages: totalType / TOTAL_PER_PAGE,
      totalType,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  public async findAllTypeRegisters(): Promise<Type | Type[]> {
    const type = await this.ormRepository.find({
      order: { id: 'DESC' },
    });
    return type;
  }

  public async deleteValidation(
    id_type: number,
  ): Promise<DowntimeManagement[] > {
    const validation = await this. ormDowntimeManagementRepository
      .createQueryBuilder('dowtime_management')
      .select([
        'id',
        'id_type'
      ])
      .where({id_type})
      .getRawMany();

    return validation;
  }


}
