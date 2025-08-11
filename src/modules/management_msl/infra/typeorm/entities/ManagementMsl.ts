import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Management from '@modules/levels_management_msl/infra/typeorm/entities/Management';
import Line from '@modules/lines/infra/typeorm/entities/Line';
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

@Entity('msl_management')
export default class ManagementMsl {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  component: string;

  @Column({ nullable: true })
  fn_factory: string;

  @Column()
  description: string;

  @JoinColumn({ name: 'id_level_msl' })
  @ManyToOne(() => Management, (management) => management.id)
  management: Management;

  @Column()
  id_level_msl: number;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;

  @Column()
  id_employee: number;

  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
