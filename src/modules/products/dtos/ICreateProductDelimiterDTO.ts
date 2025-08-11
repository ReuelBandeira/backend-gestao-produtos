import ProductDelimiter from "../infra/typeorm/entities/ProductDelimiter";

export default interface ICreateProductDelimiterDTO {
  id_product:number;
  delimiter:string;
  position_quantity:number;
  type:string;
  id_employee: number;
}

export interface ProductDelimiterPagination {
  products: ProductDelimiter[];
  totalProducts: number;
  totalPages: number;
}

