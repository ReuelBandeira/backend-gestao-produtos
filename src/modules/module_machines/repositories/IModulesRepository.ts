import ICreateModulesDTO from '../dtos/IModulesDTO';
import Modules from '../infra/typeorm/entities/Modules';

export default interface IModulesRepository {
  findById(id: number): Promise<Modules | undefined>;
  findByNameSearch(
    description: string,
  ): Promise<(Modules | undefined)[] | undefined>;
  findByName(description: string): Promise<Modules | undefined>;
  findByCode(code: string): Promise<Modules | undefined>;
  findAllModule(): Promise<Modules | Modules[]>;
  create(data: ICreateModulesDTO): Promise<Modules>;
  update(module: Modules): Promise<Modules>;
  delete(id: number): Promise<void>;
  deleteValidation(id: number): Promise<Modules[]| undefined>;
  deleteValidationModule(id: number): Promise<Modules[]| undefined>;

}
