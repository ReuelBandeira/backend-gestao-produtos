import ICreateCauseDTO from '../dtos/ICreateCauseDTO';
import Cause from '../infra/typeorm/entities/Cause';

export default interface ICauseRepository {
  findById(id: number): Promise<Cause | undefined>;
  findByNameSearch(
    description: string
  ): Promise<(Cause | undefined)[] | undefined>;
  findByName(description: string): Promise<Cause | undefined>;
  findByCode(code: string): Promise<Cause | undefined>;
  findAllCauses(): Promise<Cause | Cause[]>;
  findAllCausesNotPaginate(): Promise<Cause[]>;

  create(data: ICreateCauseDTO): Promise<Cause>;
  update(cause: Cause): Promise<Cause>;
  delete(id: number): Promise<void>;
  deleteValidation(id: number): Promise<Cause[]>;
}
