import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QualityBodyManager } from './QualityBodyManager';

@Entity('smt_quality_head')
export class QualityHeadManager {
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
  status: string;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_employee: number;

  @OneToMany(
    () => QualityBodyManager,
    (qualityBody) => qualityBody.qualityHead,
    {
      cascade: true,
    },
  )
  qualityBody: QualityBodyManager[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
