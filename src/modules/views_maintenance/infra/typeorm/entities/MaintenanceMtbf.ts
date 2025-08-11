
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_maintenance_mtbf'})
export default class MaintenanceMtbf {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'dates' })
  dates: Date;

  @Column({ name: 'intervalo' })
  intervalo: number;

}
