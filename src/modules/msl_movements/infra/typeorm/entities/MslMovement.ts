import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import MslMachines from '@modules/msl_machines/infra/typeorm/entities/MslMachines';
import Product from '@modules/products/infra/typeorm/entities/Product';
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

@Entity('msl_movements')
export default class MslMovement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  component: string;

  @Column()
  serial: string;

  @Column()
  start_date: Date;

  @Column()
  movement_type: string;

  @Column({ nullable: true })
  total_time_open?: number;

  @JoinColumn({ name: 'id_machine' })
  @ManyToOne(() => MslMachines, (mslMachines) => mslMachines.id)
  machine: MslMachines;

  @Column()
  id_machine: number;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (employee) => employee.id)
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
