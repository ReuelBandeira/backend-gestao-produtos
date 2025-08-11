// eslint-disable-next-line import/no-unresolved
import ICreateProductDelimiterDTO from "@modules/products/dtos/ICreateProductDelimiterDTO";
import ProductDelimiter from "../infra/typeorm/entities/ProductProviderSolderPaste";

export default interface IProducDelimiterRepository {
  delete(id: number): Promise<void>;
  create(data:ICreateProductDelimiterDTO): Promise<ProductDelimiter>;
  findByIdDelimiter(id_product:number,delimiter:string): Promise<ProductDelimiter | undefined>;
  // ValidationDelimiterUpdate(id_product:number,delimiter:string): Promise<ProductDelimiter | undefined>;
  findById(id: number): Promise<ProductDelimiter | undefined>;
  update(productDelimiterUpate: ProductDelimiter): Promise<ProductDelimiter>;

}
