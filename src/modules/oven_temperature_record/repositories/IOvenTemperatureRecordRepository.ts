import ICreateOvenTemperatureRecordDTO from '../dtos/ICreateOvenTemperatureRecordDTO';
import OvenTemperatureRecord from '../infra/typeorm/entities/OvenTemperatureRecord';
import ICreateOvenRecordDTO from '../dtos/ICreateOvenRecordDTO';

export default interface IOvenTemperatureRecordRepository {
  findById(id: number): Promise<OvenTemperatureRecord | undefined>;
  findByNameSearch(
    descriptiom: string,
  ): Promise<(OvenTemperatureRecord | undefined)[] | undefined>;
  listCodeExist(list_code: string): Promise<OvenTemperatureRecord[]>;
  findAllOvenTemperatureRecord(): Promise<OvenTemperatureRecord | OvenTemperatureRecord[]>;
  parameters(struct_code: string, id_oven:number): Promise<OvenTemperatureRecord[]>;
  create(data: ICreateOvenRecordDTO): Promise<OvenTemperatureRecord>;
  updateApprover_1(ovenTemperatureRecord: OvenTemperatureRecord): Promise<OvenTemperatureRecord>;
  updateApprover_2(ovenTemperatureRecord: OvenTemperatureRecord): Promise<OvenTemperatureRecord>;
  delete(id: number): Promise<void>;
  findByVerificationStatus(list_code: string): Promise<string | null>;
}
