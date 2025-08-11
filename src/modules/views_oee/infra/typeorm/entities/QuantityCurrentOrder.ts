
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_quantity_current_order' })
export default class QuantityCurrentOrder {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  id_line: number;

  @Column({ name: 'status'})
  status: string;

  @Column({ name: 'total_placas'})
  total_placas: number;

  @Column({ name: 'quantidade_placas_aceitas'})
  quantidade_placas_aceitas: number;

  @Column({ name: 'target'})
  target: number;



}
