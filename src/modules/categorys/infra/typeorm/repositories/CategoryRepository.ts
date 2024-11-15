import ICreateCategoryDTO from '@modules/categorys/dtos/ICreateCategoryDTO';
import ICategoryRepository from '@modules/categorys/repositories/ICategoryRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Category from '../entities/Category';

export default class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findById(id: number): Promise<Category | undefined> {
    const categorys = await this.ormRepository.findOne({
      where: { id },
    });

    return categorys;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const categorys = await this.ormRepository.findOne({
      where: { name },
    });

    return categorys;
  }

  public async findByNameSearch(name: string): Promise<Category[]> {
    return this.ormRepository.find({ where: { name: Like(`%${name}%`) } });
  }

  public async create(categorysData: ICreateCategoryDTO): Promise<Category> {
    const categorys = this.ormRepository.create(categorysData);
    await this.ormRepository.save(categorys);
    return categorys;
  }

  public async update(CategoryData: Category): Promise<Category> {
    const categorys = await this.ormRepository.save(CategoryData);
    return categorys;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<Category[]> {
    return this.ormRepository.find({ order: { id: 'DESC' } });
  }
}
