
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_status_current_order' })
export default class StatusCurrentOrder {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  id_line: number;

  @Column({ name: 'line_name'})
  line_name: string;

  @Column({ name: "meta_op"})
  meta_op: number

  @Column({ name: 'quantidades_de_placas_produzidas'})
  quantidades_de_placas_produzidas: number;

  @Column({ name: 'qquantidades_de_placas_teorica'})
  quantidades_de_placas_teorica: number;

  @Column({ name: 'saldo'})
  saldo: number;

  @Column({ name: 'trend_oee'})
  trend_oee: number;

  @Column({ name: 'trend_oee_signal'})
  trend_oee_signal: string;

  @Column({ name: 'oee_po_day'})
  oee_po_day: number;

  @Column({ name: 'oee_po'})
  oee_po: number;

}
