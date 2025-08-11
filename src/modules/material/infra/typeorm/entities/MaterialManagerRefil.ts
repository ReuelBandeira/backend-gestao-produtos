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

@Entity('smt_material_manager_refil')
export default class MaterialManagerRefil {
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
  component_old: string;

  @Column()
  component_new: string;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_employee: number;

  @Column()
  sequential_old: string;

  @Column()
  qr_code_information_old: string;

  @Column()
  sequential_new: string;

  @Column()
  qr_code_information_new: string;

  @Column()
  component_quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
