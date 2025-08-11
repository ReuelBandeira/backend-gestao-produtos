
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_list_order_product' })
export default class ListOrderProduct {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  id_line: number;

  @Column({ name: 'line_name'})
  line_name: string;

  @Column({ name: 'id_production_order'})
  id_production_order: number;

  @Column({ name: 'mo_code'})
  mo_code: string;

  @Column({ name: 'mo_status'})
  mo_status: string;

  @Column({ name: '	target_qty'})
  target_qty: number;

  @Column({ name: 'mo_start_date'})
  mo_start_date: Date;

  @Column({ name: 'output_qty'})
  output_qty: number;

  @Column({ name: 'id_product'})
  id_product: number;

  @Column({ name: 'product_name'})
  product_name: string;

  @Column({ name: 'product_description'})
  product_description: string;

  @Column({ name: 'regected_amount'})
  regected_amount: number;

  @Column({ name: 'disponibilidade'})
  disponibilidade: number;

  @Column({ name: 'oee_po'})
  oee_po: number;

  @Column({ name: 'rate'})
  rate: number;
}
