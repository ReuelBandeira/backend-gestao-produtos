import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateProductProviderSolderPasteDTO from '../dtos/ICreateProductProviderSolderPasteDTO';
import ProductProviderSolderPaste from '../infra/typeorm/entities/ProductProviderSolderPaste';
import IProductProviderSolderPasteRepository from '../repositories/IProductProviderSolderPasteRepository';



@injectable()
export default class CreateProductProviderSolderPasteService {
  constructor(
    @inject('ProductProviderSolderPasteRepository')
    private productProviderSolderPasteRepository: IProductProviderSolderPasteRepository,
  ) {}

  async execute({
    id_product,
    id_provider
  }: ICreateProductProviderSolderPasteDTO): Promise<ProductProviderSolderPaste> {


    const product_provider_solder_paste = await this.productProviderSolderPasteRepository.create({
      id_product,
      id_provider
    });

    return product_provider_solder_paste;
  }
}
