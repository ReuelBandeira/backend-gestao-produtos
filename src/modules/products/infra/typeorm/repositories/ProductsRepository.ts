import ICreateProductDTO from '@modules/products/dtos/ICreateProductsDTO';
import IProductRepository from '@modules/products/repositories/IProductsRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Product from '../entities/Products';

const TOTAL_PER_PAGE = 11;

export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: number): Promise<Product | undefined> {
    const products = await this.ormRepository.findOne({
      where: { id },
    });

    return products;
  }

  public async findByName(
    name: string,
    description: string
  ): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { name, description },
    });

    return products;
  }

  public async findByNameSearch(
    name: string,
    description: string
  ): Promise<Product[] | undefined> {
    const products = await this.ormRepository.find({
      relations: ['category'],
      where: {
        name: Like(`%${name}%`),
        description: Like(`%${description}%`),
      },
    });

    return products.length > 0 ? products : undefined;
  }

  public async create(ProductData: ICreateProductDTO): Promise<Product> {
    const products = this.ormRepository.create(ProductData);
    await this.ormRepository.save(products);

    return products;
  }

  public async update(ProductData: Product): Promise<Product> {
    const products = await this.ormRepository.save(ProductData);
    return products;
  }

  public async findAllProduct(page = 1): Promise<Product | Product[]> {
    const products = await this.ormRepository.find({
      relations: ['category'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalProduct = (await this.ormRepository.find()).length;

    return {
      products,
      totalPages: totalProduct / TOTAL_PER_PAGE,
      totalProduct,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<Product | Product[]> {
    const products = await this.ormRepository.find({
      relations: ['category'],
      order: { id: 'DESC' },
    });
    return products;
  }

  public async findByCategory(categoryId: number): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { categoryId },
    });

    return products;
  }
}
