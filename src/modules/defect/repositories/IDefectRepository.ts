import ICreateDefectDTO from '../dtos/ICreateDefectDTO';
import Defect from '../infra/typeorm/entities/Defect';

export default interface IDefectRepository {
  findById(id: number): Promise<Defect | undefined>;
  findByNameSearch(
    descriptiom: string
  ): Promise<(Defect | undefined)[] | undefined>;
  findByName(descriptiom: string): Promise<Defect | undefined>;
  findByCode(code: string): Promise<Defect | undefined>;
  findAllDefects(): Promise<Defect | Defect[]>;

  create(data: ICreateDefectDTO): Promise<Defect>;
  update(cause: Defect): Promise<Defect>;
  delete(id: number): Promise<void>;
  deleteValidation(id: number): Promise<Defect[] | undefined>;
  findAllDefectsNotPaginate(): Promise<Defect[]>;
}
