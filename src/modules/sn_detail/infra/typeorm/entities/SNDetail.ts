import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import WorkStation from '@modules/workstations/infra/typeorm/entities/WorkStation';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sn_detail')
export default class SNDetail {
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

  @Column()
  solder_paste_serial: string;

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

  @Column()
  in_station_time: Date;

  @Column()
  in_line_time: Date;

  @Column()
  out_line_time: Date;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
