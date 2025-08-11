
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_list_order_product_oee_current_week' })
export default class ListOrderProductOeeCurrentWeek {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  id_line: number;

  @Column({ name: 'line_name'})
  line_name: string;

  @Column({ name: 'oee_week'})
  oee_week: number;

}
