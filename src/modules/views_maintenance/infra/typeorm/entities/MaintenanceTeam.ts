
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_maintenance_team'})
export default class MaintenanceTeam {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'turno' })
  turno: number;

  @Column({ name: 'dates' })
  dates: Date;
}
