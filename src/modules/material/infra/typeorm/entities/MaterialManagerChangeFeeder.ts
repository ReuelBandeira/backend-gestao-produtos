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

@Entity('smt_material_manager_change_feeder')
export default class MaterialManagerChangeFeeder {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column()
  list_code: string;

  @Column()
  machine: string;

  @Column()
  module: string;

  @Column()
  side: number;

  @Column()
  position: number;

  @JoinColumn({ name: 'id_feeder_old' })
  @ManyToOne(() => Feeder, (feeder) => feeder.id)
  feederOld: Feeder;

  @Column()
  id_feeder_old: number;

  @JoinColumn({ name: 'id_feeder_new' })
  @ManyToOne(() => Feeder, (feeder) => feeder.id)
  feederNew: Feeder;

  @Column()
  id_feeder_new: number;

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
