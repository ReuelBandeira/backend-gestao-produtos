
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_maintenance_open_dw'})
export default class MaintenanceOpenDw {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'dates' })
  dates: Date;
}
