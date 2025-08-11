
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_hourly_production' })
export default class HourlyProduction {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  id_line: number;

  @Column({ name: 'hora'})
  hora: string;

  @Column({ name: 'quantidade_placas'})
  quantidade_placas: number;

  @Column({ name: 'target'})
  target: number;
}
