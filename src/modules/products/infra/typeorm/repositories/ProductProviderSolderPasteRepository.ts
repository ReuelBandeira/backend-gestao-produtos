import ICreateProductProviderSolderPasteDTO from "@modules/products/dtos/ICreateProductProviderSolderPasteDTO";
import IProductProviderSolderPasteRepository from "@modules/products/repositories/IProductProviderSolderPasteRepository";
import { getRepository, Repository } from "typeorm";
import ProductProviderSolderPaste from "../entities/ProductProviderSolderPaste";


const TOTAL_PER_PAGE = 11;

export default class ProductProviderSolderPasteRepository implements IProductProviderSolderPasteRepository {
  private ormRepository: Repository<ProductProviderSolderPaste>;

  constructor() {
    this.ormRepository = getRepository(ProductProviderSolderPaste);
  }

  public async create({
      id_product,
      id_provider
  }: ICreateProductProviderSolderPasteDTO): Promise<ProductProviderSolderPaste> {
    const product_provider_solder_paste = this.ormRepository.create({
      id_product,
      id_provider
    });

    await this.ormRepository.save(product_provider_solder_paste);

    return product_provider_solder_paste;
  }

}
