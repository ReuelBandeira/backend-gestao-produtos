
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_maintenance_technician'})
export default class MaintenanceOpenDw {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'tecnico' })
  tecnico: string;

  @Column({ name: 'dates' })
  dates: Date;
}
