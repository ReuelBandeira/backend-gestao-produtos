import ICreateCauseCategoryDTO from '../dtos/ICreateCauseCategoryDTO';
import Cause from '../infra/typeorm/entities/CauseCategory';

export default interface ICauseCategoryDowntimeRepository {
  findById(id: number): Promise<Cause | undefined>;
  findByNameSearch(
    description: string,
  ): Promise<(Cause | undefined)[] | undefined>;
  findByName(description: string): Promise<Cause | undefined>;
  findAllCauses(): Promise<Cause | Cause[]>;
  create(data: ICreateCauseCategoryDTO): Promise<Cause>;
  update(cause: Cause): Promise<Cause>;
  delete(id: number): Promise<void>;
  deleteValidation(id: number): Promise<Cause[]>;
}
