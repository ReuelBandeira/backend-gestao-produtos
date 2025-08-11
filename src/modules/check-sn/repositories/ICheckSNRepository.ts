import ICreateCheckSNDTO  from '../dtos/ICreateCheckSNDTO';
import CheckSN  from '../infra/typeorm/entities/CheckSN';

export interface CheckSNPagination {
  checkSN: CheckSN[];
  totalFeeders: number;
  totalPages: number;
}

export interface ICheckSNRepository {

  findByCheckSN(serial_number: string): Promise<CheckSN | undefined>;

  create(data: ICreateCheckSNDTO): Promise<CheckSN>;

}
