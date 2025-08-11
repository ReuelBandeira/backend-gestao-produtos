import ICreateQualityBody from '../dtos/ICreateQualityBody';
import { QualityBodyManager } from '../infra/typeorm/entities/QualityBodyManager';

export default interface IQualityBodyManagerRepository {
  findPositionsByModule(
    list_code: string,
    machine: string,
    module: string,
    side: number,
  ): Promise<QualityBodyManager[]>;
  create(data: ICreateQualityBody): Promise<QualityBodyManager>;

  totalComponentBodyListQualityModule (
    list_code: string,
    machine: string,
    module: string,
    side: number,
    id: number,
  ): Promise<number>;

}
