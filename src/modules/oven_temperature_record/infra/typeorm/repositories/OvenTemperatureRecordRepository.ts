import ICreateOvenTemperatureRecordDTO from '@modules/oven_temperature_record/dtos/ICreateOvenTemperatureRecordDTO';
import IOvenTemperatureRecordRepository from '@modules/oven_temperature_record/repositories/IOvenTemperatureRecordRepository';
import { getRepository, LessThan, Like, Repository } from 'typeorm';
import { MaterialManager } from '@modules/material/infra/typeorm/entities/MaterialManager';
import OvenTemperatureRecord from '../entities/OvenTemperatureRecord';

const TOTAL_PER_PAGE = 11;

export default class OvenTemperatureRecordRepository implements IOvenTemperatureRecordRepository {
  private ormRepository: Repository<OvenTemperatureRecord>;

  private ormMaterialManagerRepository: Repository<MaterialManager>;

  constructor() {
    this.ormRepository = getRepository(OvenTemperatureRecord);
    this.ormMaterialManagerRepository = getRepository(MaterialManager);

  }

  public async findById(id: number): Promise<OvenTemperatureRecord | undefined> {
    // eslint-disable-next-line no-shadow
    const OvenTemperatureRecord = await this.ormRepository.findOne({
      where: { id },
    });

    return OvenTemperatureRecord;
  }

  public async findByName(description: string): Promise<OvenTemperatureRecord | undefined> {
    // eslint-disable-next-line no-shadow
    const OvenTemperatureRecord = await this.ormRepository.findOne({
      where: { description }
    });

    return OvenTemperatureRecord;
  }

  public async findByNameSearch(
    list_code: string,
  ): Promise<(OvenTemperatureRecord | undefined)[] | undefined> {
    // eslint-disable-next-line no-shadow
    const OvenTemperatureRecord = await this.ormRepository.find({
      relations: ['oven','userApprover_1','userApprover_2','userApprover_3'],
      where: { list_code: Like(`%${list_code}%`) },
    });

    return OvenTemperatureRecord;
  }

  public async create(OvenTemperatureRecordData: ICreateOvenTemperatureRecordDTO): Promise<OvenTemperatureRecord> {
    // eslint-disable-next-line no-shadow
    const OvenTemperatureRecord = this.ormRepository.create(OvenTemperatureRecordData);
    await this.ormRepository.save(OvenTemperatureRecord);

    return OvenTemperatureRecord;
  }

  public async updateApprover_1(OvenTemperatureRecordData: OvenTemperatureRecord): Promise<OvenTemperatureRecord> {
    // eslint-disable-next-line no-shadow
    const OvenTemperatureRecord = await this.ormRepository.save(OvenTemperatureRecordData);
    return OvenTemperatureRecord;
  }

  public async updateApprover_2(OvenTemperatureRecordData: OvenTemperatureRecord): Promise<OvenTemperatureRecord> {
    // eslint-disable-next-line no-shadow
    const OvenTemperatureRecord = await this.ormRepository.save(OvenTemperatureRecordData);
    return OvenTemperatureRecord;
  }

  public async findAllOvenTemperatureRecord(page=1,): Promise<OvenTemperatureRecord | OvenTemperatureRecord[]> {
    // eslint-disable-next-line no-shadow
    const OvenTemperatureRecord = await this.ormRepository.find({
      relations: ['oven','userApprover_1','userApprover_2','userApprover_3'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalOvenTemperatureRecord = (await this.ormRepository.find()).length;

    return {
      OvenTemperatureRecord,
      totalPages:totalOvenTemperatureRecord/ TOTAL_PER_PAGE,
      totalOvenTemperatureRecord,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<OvenTemperatureRecord| OvenTemperatureRecord[]> {
    // eslint-disable-next-line no-shadow
    const OvenTemperatureRecord = await this.ormRepository.find({
      relations: ['oven','userApprover_1','userApprover_2','userApprover_3'],
      order: { id: 'DESC' },
    });
    return OvenTemperatureRecord;
  }

  async listCodeExist(
    list_code: string,
  ): Promise<MaterialManager[] > {
    const check = await this.ormMaterialManagerRepository
      .createQueryBuilder('smt_material_manager')
      .select([
        'struct_code',
      ])
      .where ({list_code})
      .getRawMany();
    return check;
  }

  public async parameters(struct_code:string,id_oven:number): Promise<OvenTemperatureRecord[]> {
    // eslint-disable-next-line no-shadow
    const parametersTemperatureRecord = await this.ormRepository.find({
      order: { id: 'DESC' },
      where: {struct_code,id_oven,status:"approved"}
    });
    return parametersTemperatureRecord;
  }

  public async findByDetail(
    id: number,
    struct_code: string,
    id_oven: number
  ): Promise<OvenTemperatureRecord[]> {
    // eslint-disable-next-line no-shadow
    const OvenTemperatureRecord = await this.ormRepository.find({
      relations: ['oven', 'userApprover_1', 'userApprover_2', 'userApprover_3'],
      order: { id: 'DESC' },
      where: {
        struct_code,
        id_oven,
        status:"waiting for approval",
        id: LessThan(id) // Adicionando essa condição para filtrar por id menor que o informado
      },
    });

    return OvenTemperatureRecord;
  }

  // public async findByVerificationStatus(list_code:string): Promise<OvenTemperatureRecord[]> {
  //   // eslint-disable-next-line no-shadow
  //   const status = await this.ormRepository.find({
  //     order: { id: 'DESC' },
  //     where: {list_code}
  //   });
  //   return status;
  // }

  public async findByVerificationStatus(list_code: string): Promise<string | null> {
    const statusRecord = await this.ormRepository.findOne({
      select: ['status'],
      order: { id: 'DESC' },
      where: { list_code }
    });
    return statusRecord?.status || null;
  }




}
