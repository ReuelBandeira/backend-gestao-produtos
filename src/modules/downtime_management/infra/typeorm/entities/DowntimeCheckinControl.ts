
import Employee from '@modules/employee/infra/typeorm/entities/Employee';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import DowntimeManagement from './DowntimeManagement';


@Entity('dowtime_checkin_control')
export default class DowntimeCheckinControl{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_employee_checkin' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @JoinColumn({name: 'id_downtime' })
  @ManyToOne(() => DowntimeManagement, (downtimeManagemente) => downtimeManagemente.id)
  downtimeManagemente:DowntimeManagement;

  @Column()
  id_downtime: number;

  @Column()
  zone_type: string;

  @Column()
  id_employee_checkin: number;

  @Column()
  status: string;

  @Column()
  date_accompanying_checkin: string;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
