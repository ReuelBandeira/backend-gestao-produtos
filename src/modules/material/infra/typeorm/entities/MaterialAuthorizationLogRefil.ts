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

@Entity('log_refil_authorization')
export default class MaterialAuthorizationLogRefil {
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
  component_new: string;

  @Column()
  component_old: string;

  @Column()
  status: string;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @JoinColumn({ name: 'id_employee_authorization' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee_authorization: Employee;

  @Column()
  id_employee_authorization: number;



  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
