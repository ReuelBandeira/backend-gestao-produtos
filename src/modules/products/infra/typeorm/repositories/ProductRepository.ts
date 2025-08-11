import ICreateProductDTO, {
  ProductPagination,
} from '@modules/products/dtos/ICreateProductDTO';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Product from '../entities/Product';
import ProductProviderSolderPaste from '../entities/ProductProviderSolderPaste';

const TOTAL_PER_PAGE = 11;
export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  private ormProductProviderSolderRepository: Repository<ProductProviderSolderPaste>;

  constructor() {
    this.ormRepository = getRepository(Product);
    this.ormProductProviderSolderRepository = getRepository(ProductProviderSolderPaste);
  }

  public async findAllProductsWithoutComposition(): Promise<Product[]> {
    return await this.ormRepository.find({
      relations: ["snComposition"],
      where: {
        snComposition: {
          created_at: null
        }
      }
    })
  }

  public async findById(id: number): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({ id });

    return findProduct;
  }

  public async findByProductName(
    product_name: string,
  ): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: { product_name },
    });

    return findProduct;
  }

  public async findByProductNameSearch(
    product_name: string,
  ): Promise<(Product | undefined)[] | undefined> {
    const findProduct = await this.ormRepository.find({
      relations: ['family_record'],
      where: { product_name: Like(`${product_name}%`) },
      take: 11,
      order: { id: 'DESC' },
    });

    return findProduct;
  }

  public async findAllProducts(page = 1): Promise<ProductPagination> {
    const products = await this.ormRepository.find({
      relations: ['family_record'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalProducts = (await this.ormRepository.find()).length;

    return {
      products,
      totalProducts,
      totalPages: totalProducts / TOTAL_PER_PAGE,
    };
  }

  public async create({
    description,
    product_name,
    type_side,
    exception,
    side_init,
    number_plates_panel,
    client,
    code_pcba,
    tag,
    type_plate,
    amount_parent,
    id_family
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      description,
      product_name,
      type_side,
      exception,
      side_init,
      number_plates_panel,
      client,
      code_pcba,
      tag,
      type_plate,
      amount_parent,
      id_family
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async update(product: Product): Promise<Product> {
    const update = await this.ormRepository.save(product);
    return update;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllProductsList(): Promise<Product[]> {
    const products = await this.ormRepository.find({
      order: { id: 'DESC' },
    });

    return products;
  }

  public async findAllProductListSelect(
    id: number,
  ): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { id, },
    });

    return products;
  }

  async findProviders(
    id_product: number,
  ): Promise<ProductProviderSolderPaste[] | undefined> {
    const providers_solder = await this.ormProductProviderSolderRepository

      .createQueryBuilder('product_provider_solder_paste')
      .leftJoinAndSelect('product_provider_solder_paste.provider', 'provider')
      .select([
        'id_provider',
        'provider.provider_name as provider_name',
        'provider.description_provider as description_provider',
        'provider.acronym as acronym'
      ])
      .where({ id_product })
      .getRawMany();

    return providers_solder;
  }

  async deleteProductProvider(
    id_product: number
  ): Promise<void> {
    await this.ormProductProviderSolderRepository
      .createQueryBuilder('product_provider_solder_paste')
      .delete()
      .where({ id_product })
      .execute();
  }

  public async findIdProduct(
    product_name: string
  ): Promise<Product[]> {
    const id_products = await this.ormRepository.find({
      where: { product_name },
    });

    return id_products;
  }

}
