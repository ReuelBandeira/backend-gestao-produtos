import { ProductionOrder } from '../infra/typeorm/entities/ProductionOrders';

export default interface ICreateProductionOderDTO {
  mo_code: string;
  target_qty: number;
  customer?: string;
  id_product: number;
  id_employee: number;
  mo_prevision_start_date: Date;
  process_number: string;
  type: string;
}

export interface ProductionOrdersPagination {
  po: ProductionOrder[];
  totalOrders: number;
  totalPages: number;
}
