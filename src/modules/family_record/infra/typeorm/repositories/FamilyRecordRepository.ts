import ICreateFamilyRecordDTO from '@modules/family_record/dtos/ICreateFamilyRecordDTO';
import IFamilyRecordRepository from '@modules/family_record/repositories/IFamilyRecordRepository';
import { getRepository, Like, Repository } from 'typeorm';
import FamilyRecord from '../entities/FamilyRecord';

const TOTAL_PER_PAGE = 11;

export default class FamilyRecordRepository implements IFamilyRecordRepository {
  private ormRepository: Repository<FamilyRecord>;

  constructor() {
    this.ormRepository = getRepository(FamilyRecord);

  }

  public async findById(id: number): Promise<FamilyRecord | undefined> {
    const FamilyRecord = await this.ormRepository.findOne({
      where: { id },
    });

    return FamilyRecord;
  }

  public async findByName(description: string): Promise<FamilyRecord | undefined> {
    const FamilyRecord = await this.ormRepository.findOne({
      where: { description }
    });

    return FamilyRecord;
  }

  public async findByNameSearch(
    description: string,
  ): Promise<(FamilyRecord | undefined)[] | undefined> {
    const FamilyRecord = await this.ormRepository.find({
      where: { description: Like(`%${description}%`) },
    });

    return FamilyRecord;
  }

  public async create(FamilyRecordData: ICreateFamilyRecordDTO): Promise<FamilyRecord> {
    const FamilyRecord = this.ormRepository.create(FamilyRecordData);
    await this.ormRepository.save(FamilyRecord);

    return FamilyRecord;
  }

  public async update(FamilyRecordData: FamilyRecord): Promise<FamilyRecord> {
    const FamilyRecord = await this.ormRepository.save(FamilyRecordData);
    return FamilyRecord;
  }

  public async findAllFamilyRecord(page=1,): Promise<FamilyRecord | FamilyRecord[]> {
    const FamilyRecord = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalFamilyRecord = (await this.ormRepository.find()).length;

    return {
      FamilyRecord,
      totalPages:totalFamilyRecord/ TOTAL_PER_PAGE,
      totalFamilyRecord,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<FamilyRecord| FamilyRecord[]> {
    const FamilyRecord = await this.ormRepository.find({
      order: { id: 'DESC' },
    });
    return FamilyRecord;
  }

}
