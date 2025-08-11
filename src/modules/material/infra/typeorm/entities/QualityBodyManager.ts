import Employee from '@modules/employee/infra/typeorm/entities/Employee';
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
import { QualityHeadManager } from './QualityHeadManager';

@Entity('smt_quality_body')
export class QualityBodyManager {
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

  @Column()
  component: string;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_employee: number;

  @JoinColumn({ name: 'id_quality_head' })
  @ManyToOne(() => QualityHeadManager, (quality) => quality.id)
  qualityHead: QualityHeadManager;

  @Column()
  id_quality_head: number;

  @Column()
  qr_code_information: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
