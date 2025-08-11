
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_maintenance_technician'})
export default class MaintenanceTopMachines {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'maquina' })
  maquina: string;

  @Column({ name: 'dates' })
  dates: Date;
}
