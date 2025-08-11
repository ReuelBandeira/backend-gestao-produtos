import ICreateToolingControlDTO, {
  ToolingControlPagination,
} from '@modules/tooling_control/dtos/ICreateToolingControlDTO';
import ToolingControl from '@modules/tooling_control/infra/typeorm/entities/ToolingControl';
import IToolingControlRepository from '../IToolingControlRepository';

export default class FakeToolingControlRepository implements IToolingControlRepository {
  private products: ToolingControl[] = [];

  public async findById(id: number): Promise<ToolingControl | undefined> {
    const findProduct = await this.products.find(
      (product) => product.id === id,
    );

    return findProduct;
  }

  public async findByToolingControlName(
    product_name: string,
  ): Promise<ToolingControl | undefined> {
    const findProduct = this.products.find(
      (product) => product.product_name === product_name,
    );

    return findProduct;
  }

  public async findByProductNameSearch(
    description_tooling_control: string,
    page:number,
  ): Promise<(ToolingControlPagination | undefined)[] | undefined> {
    throw new Error('Method not implemented.');
  }

  public async findAllProducts(page: number): Promise<ToolingControlPagination> {
    return {
      products: this.products,
      totalProducts: 1,
      totalPages: 1,
    };
  }

  public async create({
    product_name,
    description_tooling_control,

  }: ICreateToolingControlDTO): Promise<ToolingControl> {
    const product = new ToolingControl();

    Object.assign(product, {
      id: Math.round(Math.random() * 10),
      product_name,
      description_tooling_control,

    });

    this.products.push(product);

    return product;
  }

  public async update(product: ToolingControl): Promise<ToolingControl> {
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
