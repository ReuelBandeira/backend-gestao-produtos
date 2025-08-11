import ICreateFamilyRecordDTO from '../dtos/ICreateFamilyRecordDTO';
import FamilyRecord from '../infra/typeorm/entities/FamilyRecord';

export default interface IFamilyRecordRepository {
  findById(id: number): Promise<FamilyRecord | undefined>;
  findByNameSearch(
    descriptiom: string,
  ): Promise<(FamilyRecord | undefined)[] | undefined>;
  findByName(descriptiom: string): Promise<FamilyRecord | undefined>;
  findAllFamilyRecord(): Promise<FamilyRecord | FamilyRecord[]>;

  create(data: ICreateFamilyRecordDTO): Promise<FamilyRecord>;
  update(FamilyRecord: FamilyRecord): Promise<FamilyRecord>;
  delete(id: number): Promise<void>;

}
