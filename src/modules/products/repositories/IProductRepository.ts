import ICreateProductDTO, {
  ProductPagination,
} from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  findById(id: number): Promise<Product | undefined>;
  findByProductName(product_name: string): Promise<Product | undefined>;
  findByProductNameSearch(
    product_name: string,
  ): Promise<(Product | undefined)[] | undefined>;
  findAllProducts(page: number): Promise<ProductPagination | Product[]>;
  create(data: ICreateProductDTO): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
  findAllProductsList(): Promise<Product[]>;
  findAllProductListSelect(id: number): Promise<Product | undefined>;
  findAllProductsWithoutComposition(): Promise<Product[]>
}
