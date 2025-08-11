
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_hourly_production_detail' })
export default class HourlyProductionDetail {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'out_line_time' })
  out_line_time: Date;

  @Column({ name: 'serial_number'})
  serial_number: string;

  @Column({ name: 'id_line'})
  id_line: string;

  @Column({ name: 'turno'})
  turno: number;
}
