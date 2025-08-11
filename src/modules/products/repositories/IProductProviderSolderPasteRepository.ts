import ICreateProductProviderSolderPasteDTO from "@modules/products/dtos/ICreateProductProviderSolderPasteDTO";
import ProductProviderSolderPaste from "../infra/typeorm/entities/ProductProviderSolderPaste";

export default interface IProducProviderSolderPasteRepository {

  create(data:ICreateProductProviderSolderPasteDTO): Promise<ProductProviderSolderPaste>;

}
