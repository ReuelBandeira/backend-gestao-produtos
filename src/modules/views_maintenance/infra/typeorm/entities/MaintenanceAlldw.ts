
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_maintenance_all_dw'})
export default class MaintenanceAlldw {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'dates' })
  dates: Date;
}
