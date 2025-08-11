
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_list_order_product_team' })
export default class ListOrderProductTeam {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  id_line: number;

  @Column({ name: 'line_name'})
  line_name: string;

  @Column({ name: 'disponibilidade'})
  disponibilidade: number;

  @Column({ name: 'rate'})
  rate: number;
}
