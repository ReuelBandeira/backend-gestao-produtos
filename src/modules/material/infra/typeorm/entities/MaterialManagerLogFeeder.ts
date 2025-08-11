import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import { Feeder } from '@modules/feeder/infra/typeorm/entities/Feeder';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('log_feeder')
export default class MaterialManagerLogFeeder {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column()
  list_code: string;

  @Column()
  machine: string;

  @Column()
  module: string;

  @Column()
  position: number;

  @Column()
  side: number;

  @Column()
  status: string;

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

  @JoinColumn({ name: 'feeder_old' })
  @ManyToOne(() => Feeder, (feeder) => feeder.id)
  feederOld: Feeder;

  @Column()
  feeder_old: string;

  @JoinColumn({ name: 'feeder_new' })
  @ManyToOne(() => Feeder, (feeder) => feeder.id)
  feederNew: Feeder;

  @Column()
  feeder_new: string;
}
