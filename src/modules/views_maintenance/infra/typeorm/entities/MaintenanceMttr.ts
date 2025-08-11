
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_maintenance_mttr'})
export default class MaintenanceMttr {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'name_machine' })
  name_machine: string;

  @Column({ name: 'stop_start_date' })
  stop_start_date: Date;

  @Column({ name: 'final_stop_date' })
  final_stop_date: Date;

  @Column({ name: 'intervalo' })
  intervalo: number;

}
