import ICreateTypeDTO from '../dtos/ITypeDTO';
import Type from '../infra/typeorm/entities/Type';

export default interface ITypeRepository {
  findById(id: number): Promise<Type | undefined>;
  findByNameSearch(
    description: string,
  ): Promise<(Type | undefined)[] | undefined>;
  findByName(description: string): Promise<Type | undefined>;
  findByCode(code: string): Promise<Type | undefined>;
  findAllType(): Promise<Type | Type[]>;
  create(data: ICreateTypeDTO): Promise<Type>;
  update(cause: Type): Promise<Type>;
  delete(id: number): Promise<void>;
  deleteValidation(id: number): Promise<Type[]| undefined>;

}
