import ICreateQualityHead from '../dtos/ICreateQualityHead';
import { QualityHeadManager } from '../infra/typeorm/entities/QualityHeadManager';

export default interface IQualityHeadManagerRepository {
  findQualityOpenByListCode(
    list_code: string,
    machine: string,
    module: string,
    side: number,
  ): Promise<QualityHeadManager | undefined>;
  create(data: ICreateQualityHead): Promise<QualityHeadManager>;
  updateStatus(
    list_code: string,
    machine: string,
    module: string,
    side: number,
    status: 'online' | 'offline',
    id_employee: number,
  ): Promise<void>;
}
