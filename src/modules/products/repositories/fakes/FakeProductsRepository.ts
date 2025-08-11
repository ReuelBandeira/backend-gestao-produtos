import ICreateProductDTO, {
  ProductPagination,
} from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductRepository from '../IProductRepository';

export default class FakeProductRepository implements IProductRepository {
  private products: Product[] = [];

  public async findById(id: number): Promise<Product | undefined> {
    const findProduct = await this.products.find(
      (product) => product.id === id,
    );

    return findProduct;
  }

  public async findByProductName(
    product_name: string,
  ): Promise<Product | undefined> {
    const findProduct = this.products.find(
      (product) => product.product_name === product_name,
    );

    return findProduct;
  }

  public async findByProductNameSearch(
    product_name: string,
  ): Promise<(Product | undefined)[] | undefined> {
    throw new Error('Method not implemented.');
  }

  public async findAllProducts(page: number): Promise<ProductPagination> {
    return {
      products: this.products,
      totalProducts: 1,
      totalPages: 1,
    };
  }

  public async create({
    product_name,
    description,
    type_side,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: Math.round(Math.random() * 10),
      product_name,
      description,
      type_side,
    });

    this.products.push(product);

    return product;
  }

  public async update(product: Product): Promise<Product> {
    const findByIndex = this.products.findIndex(
      (findproduct) => findproduct.id === product.id,
    );

    this.products[findByIndex] = product;

    return product;
  }

  public async delete(id: number): Promise<void> {
    const findByIndex = this.products.findIndex(
      (findproduct) => findproduct.id === id,
    );

    this.products.splice(findByIndex, 1);
  }
}
