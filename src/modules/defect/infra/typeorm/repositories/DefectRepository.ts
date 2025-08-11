import ICreateDefectDTO from '@modules/defect/dtos/ICreateDefectDTO';
import IDefectRepository from '@modules/defect/repositories/IDefectRepository';
import MaintenanceFeeder from '@modules/maintenance_feeder/infra/typeorm/entities/MaintenanceFeeder';
import { getRepository, Like, Repository } from 'typeorm';
import Defect from '../entities/Defect';

const TOTAL_PER_PAGE = 11;

export default class DefectRepository implements IDefectRepository {
  private ormRepository: Repository<Defect>;

  private ormMaintenanceRepository: Repository<MaintenanceFeeder>;

  constructor() {
    this.ormRepository = getRepository(Defect);
    this.ormMaintenanceRepository = getRepository(MaintenanceFeeder);
  }

  public async findAllDefectsNotPaginate(): Promise<Defect[]> {
    return await this.ormRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async findById(id: number): Promise<Defect | undefined> {
    const defect = await this.ormRepository.findOne({
      where: { id },
    });

    return defect;
  }

  public async findByName(description: string): Promise<Defect | undefined> {
    const defect = await this.ormRepository.findOne({
      where: { description },
    });

    return defect;
  }

  public async findByCode(code: string): Promise<Defect | undefined> {
    const defect = await this.ormRepository.query(
      `${'SELECT * FROM defect  where code = "'}${code}"`
    );
    return defect;
  }

  public async findByNameSearch(
    description: string
  ): Promise<(Defect | undefined)[] | undefined> {
    const defect = await this.ormRepository.find({
      where: { description: Like(`%${description}%`) },
    });

    return defect;
  }

  public async create(defectData: ICreateDefectDTO): Promise<Defect> {
    const defect = this.ormRepository.create(defectData);
    await this.ormRepository.save(defect);

    return defect;
  }

  public async update(defectData: Defect): Promise<Defect> {
    const defect = await this.ormRepository.save(defectData);
    return defect;
  }

  public async findAllDefects(page = 1): Promise<Defect | Defect[]> {
    const defect = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalDefects = (await this.ormRepository.find()).length;

    return {
      defect,
      totalPages: totalDefects / TOTAL_PER_PAGE,
      totalDefects,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllTypeFeeder(): Promise<Defect | Defect[]> {
    const defect = await this.ormRepository.find({
      order: { id: 'DESC' },
      where: {
        type: 'type_feeder',
      },
    });
    return defect;
  }

  public async deleteValidation(
    id_defect: number
  ): Promise<MaintenanceFeeder[]> {
    const validation = await this.ormMaintenanceRepository
      .createQueryBuilder('maintenance_feeder')
      .select(['id', 'id_feeders', 'id_defect', 'type_maintenance'])
      .where({ id_defect })
      .getRawMany();

    return validation;
  }
}
