import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  findById(id: number): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  findByNameSearch(name: string): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: number): Promise<void>;
  findAllRegisters(): Promise<Category[]>;
}
