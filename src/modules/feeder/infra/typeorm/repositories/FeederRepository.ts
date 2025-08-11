import { ICreateFeederDTO } from '@modules/feeder/dtos/ICreateFeederDTO';
import {
  FeederPagination,
  IFeederRepository,
} from '@modules/feeder/repositories/IFeederRepository';
import MaintenanceFeeder from '@modules/maintenance_feeder/infra/typeorm/entities/MaintenanceFeeder';
import { getRepository, Like,Repository } from 'typeorm';
import { Feeder } from '../entities/Feeder';

const TOTAL_PER_PAGE = 14;

export class FeederRepository implements IFeederRepository {
  private ormrepository: Repository<Feeder>;

  private ormMaintenanceRepository: Repository<MaintenanceFeeder>;

  constructor() {
    this.ormrepository = getRepository(Feeder);
    this.ormMaintenanceRepository = getRepository(MaintenanceFeeder);
  }

  async findById(id: number): Promise<Feeder | undefined> {
    const feeder = await this.ormrepository.findOne(id);

    return feeder;
  }

  async findByFeederName(feeder_code: string): Promise<Feeder | undefined> {
    const feeder = await this.ormrepository.findOne({ feeder_code });

    return feeder;
  }

  async findByFeederNameSearch(
    feeder_code: string,
  ): Promise<(Feeder | undefined)[] | undefined> {
    const feeder = await this.ormrepository.find({
      relations: ['typefeeder'],
      where: { feeder_code: Like(`${feeder_code}%`) },
      take: TOTAL_PER_PAGE,
    });

    return feeder;
  }

  async findAllFeeders(page = 1): Promise<FeederPagination> {
    const feeder = await this.ormrepository.find({
      relations: ['typefeeder'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalFeeders = (await this.ormrepository.find()).length;

    return {
      feeder,
      totalFeeders,
      totalPages: totalFeeders / TOTAL_PER_PAGE,
    };
  }

  async findAllFeedersWithoutPagination(): Promise<Feeder[]> {
    const feederlist = this.ormrepository.find({
      relations: ['typefeeder'],
      order: { id: 'DESC' },
    });

    return feederlist;
  }

  async create({
    feeder_code,
    status,
    mouting_limit,
    used_qty,
    id_type_feeder,
  }: ICreateFeederDTO): Promise<Feeder> {
    const createFeeder = this.ormrepository.create({
      feeder_code,
      status,
      mouting_limit,
      used_qty,
      id_type_feeder,
    });

    await this.ormrepository.save(createFeeder);

    return createFeeder;
  }

  async update(feeder: Feeder): Promise<Feeder> {
    const update = await this.ormrepository.save(feeder);

    return update;
  }

  async delete(id: number): Promise<void> {
    await this.ormrepository.delete({ id });
  }

  async updateStatus(id: number): Promise<void> {
    await this.ormrepository
    .createQueryBuilder()
    .update(Feeder)
    .set({ status: 'available' })
    .where({ id })
    .execute();
  }

  findByLineFeeder(id: number): Promise<Feeder> {
    const feeder = this.ormrepository
    .query(
      ' select smts.list_code, l.line_name,smts.position,smts.module,smts.machine '+
      ' from smt_material_manager_setup smts '+
      ' join smt_material_manager smt '+
      '   on smts.list_code = smt.list_code '+
      '   and smt.status = "online" or smt.status= "ready" or smt.status="loading" '+
      ' join `lines` l '+
      '   on smts.id_line = l.id '+
      ' where smts.id_feeder = '+ id
      +' and smts.deleted_at is null '+
      ' order by smts.created_at desc limit 1 '
    );
    return feeder;
  }

  public async feedersRegistered(
    feeder_code: string,
  ): Promise<Feeder[]> {
    const feeders = await this.ormrepository
      .createQueryBuilder()
      .select([
        'id',
        'feeder_code',
        'status',
        'used_qty'
      ])
      .where({feeder_code})
      .getRawMany();

    return feeders;
  }

  public async deleteValidation(
    id_feeders: number,
  ): Promise<MaintenanceFeeder[] > {
    const validation = await this.ormMaintenanceRepository
      .createQueryBuilder('maintenance_feeder')
      .select([
        'id',
        'id_feeders',
        'id_defect',
        'type_maintenance'
      ])
      .where({id_feeders})
      .getRawMany();

    return validation;
  }

  public async findAllRegisters(): Promise<Feeder | Feeder[]> {
    const feeders = await this.ormrepository.find({
      relations: ['typefeeder'],
      order: { id: 'DESC' },
      // where:{used_qty:MoreThan(5000000)}
    });
    return feeders;
  }

  public async checkFeeder(
    feeder_code: string,
  ): Promise<Feeder[]> {
    const validation = await this.ormrepository.find({
      where: {feeder_code},
    });
    return validation;
  }


}
