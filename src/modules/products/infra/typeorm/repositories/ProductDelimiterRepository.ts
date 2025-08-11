import ICreateDelimiterDTO, { ProductDelimiterPagination } from "@modules/products/dtos/ICreateProductDelimiterDTO";
import IProductDelimiterRepository from "@modules/products/repositories/IProductDelimiterRepository";
import { getRepository, Repository } from "typeorm";
// eslint-disable-next-line import/no-duplicates
import ICreateProductDelimiterDTO from "@modules/products/dtos/ICreateProductDelimiterDTO";
import ProductDelimiter from "../entities/ProductDelimiter";


const TOTAL_PER_PAGE = 11;

export default class ProductDelimiterRepository implements IProductDelimiterRepository {
  private ormRepository: Repository<ProductDelimiter>;

  constructor() {
    this.ormRepository = getRepository(ProductDelimiter);
  }

  public async create({
    id_product,
    delimiter,
    position_quantity,
    type,
    id_employee
  }: ICreateProductDelimiterDTO): Promise<ProductDelimiter> {
    const product_demiliter = this.ormRepository.create({
      id_product,
      delimiter,
      position_quantity,
      type,
      id_employee
    });

    await this.ormRepository.save(product_demiliter);

    return product_demiliter;
  }

  public async findByIdDelimiter(
    id_product:number,delimiter:string
  ): Promise<ProductDelimiter | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: {id_product,delimiter}
    });

    return findProduct;
  }

  public async findById(id: number): Promise<ProductDelimiter | undefined> {
    const findProduct = await this.ormRepository.findOne({ id });

    return findProduct;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async update(productDelimiterUpate: ProductDelimiter): Promise<ProductDelimiter> {
    const update = await this.ormRepository.save(productDelimiterUpate);
    return update;
  }


  public async findAllProductsDelimiter(page = 1): Promise<ProductDelimiterPagination> {
    const products = await this.ormRepository.find({
      relations: ['product','employee'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const updatedProducts = products.map(product => {
      delete product.employee.id;
      delete product.employee.name;
      delete product.employee.email;
      delete product.employee.password;
      delete product.employee.role;
      delete product.employee.departament;
      delete product.employee.created_at;
      delete product.employee.updated_at;
      return product;
    });

    const totalProducts = (await this.ormRepository.find()).length;

    return {
      products:updatedProducts,
      totalProducts,
      totalPages: totalProducts / TOTAL_PER_PAGE,
    };
  }


  public async findAll(): Promise<ProductDelimiterPagination> {
    const products = await this.ormRepository.find({
      relations: ['product','employee'],
      order: { id: 'DESC' }
    });

    const updatedProducts = products.map(product => {
      delete product.employee.id;
      delete product.employee.name;
      delete product.employee.email;
      delete product.employee.password;
      delete product.employee.role;
      delete product.employee.departament;
      delete product.employee.created_at;
      delete product.employee.updated_at;
      return product;
    });

    return {products_delimiter_all:updatedProducts};
  }

  public async ProductFilter(id_product: number,page = 1): Promise<ProductDelimiterPagination> {
    const products = await this.ormRepository.find({
      where: {id_product},
      relations: ['product','employee'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const updatedProducts = products.map(product => {
      delete product.employee.id;
      delete product.employee.name;
      delete product.employee.email;
      delete product.employee.password;
      delete product.employee.role;
      delete product.employee.departament;
      delete product.employee.created_at;
      delete product.employee.updated_at;
      return product;
    });

    const totalProducts = (await this.ormRepository.find()).length;

    return {
      products:updatedProducts,
      totalProducts,
      totalPages: totalProducts / TOTAL_PER_PAGE,
    };
  }



}
