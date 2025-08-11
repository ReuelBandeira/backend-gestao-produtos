import Action from '@modules/action/infra/typeorm/entities/Action';
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
import MaintenanceFeeder from './MaintenanceFeeder';


@Entity('maintenance_feeder_actions')
export default class MaintenanceFeederActions {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({name: 'id_maintenance_feeder' })
  @ManyToOne(() => MaintenanceFeeder, (maintenance_feeder) => maintenance_feeder.id)
  maintenance_feeder: MaintenanceFeeder;

  @JoinColumn({name: 'id_action' })
  @ManyToOne(() => Action , (action) => action.id)
  action:Action ;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_maintenance_feeder: number;

  @Column()
  id_action: number;

  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
