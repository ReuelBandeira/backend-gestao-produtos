import Product from '../infra/typeorm/entities/Product';

// eslint-disable-next-line no-shadow
enum ProductTypeSide {
  SINGLE = 'single',
  DOUBLE = 'double',
}

export default interface ICreateProductDTO {
  product_name: string;
  description: string;
  type_side: ProductTypeSide;
  exception: number;
  side_init: string;
  number_plates_panel: number;

  client?: string;
  type_plate?: string;
  code_pcba?: string;
  tag?: string;
  amount_parent?: number;
  id_family: number

}

export interface ProductPagination {
  products: Product[];
  totalProducts: number;
  totalPages: number;
}
