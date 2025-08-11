
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_list_order_product_hour' })
export default class ListOrderProductHour {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  id_line: number;

  @Column({ name: 'line_name'})
  line_name: string;

  @Column({ name: 'disponibilidade'})
  disponibilidade: number;
}
