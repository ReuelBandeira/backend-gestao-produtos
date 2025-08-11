import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import Workgroup from '@modules/workgroups/infra/typeorm/entities/Workgroup';
import WorkStation from '@modules/workstations/infra/typeorm/entities/WorkStation';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('trackings')
export default class Tracking {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fase: number;

  @Column()
  serial_number: string;

  @Column()
  mo_number: string;

  @Column()
  model_name: string;

  @Column()
  serial_raspberry: string;

  @Column()
  serial_dad: string;

  @JoinColumn({ name: 'id_next_workgroup' })
  @ManyToOne(() => Workgroup, (workgroup) => workgroup.id)
  workgroup: Workgroup;

  @Column()
  id_next_workgroup?: number;

  @Column({ nullable: true })
  in_station_time: Date;

  @Column({ nullable: true })
  in_line_time: Date;

  @Column({ nullable: true })
  out_line_time: Date;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;

  @Column()
  id_employee: number;

  @JoinColumn({ name: 'id_line' })
  @ManyToOne(() => Line, (line) => line.id)
  line: Line;

  @Column()
  id_line: number;

  @JoinColumn({ name: 'id_work_station' })
  @ManyToOne(() => WorkStation, (workStation) => workStation.id)
  workStation: WorkStation;

  @Column()
  id_work_station: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}
