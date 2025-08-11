// eslint-disable-next-line no-shadow
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
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


@Entity('oven')
export default class Oven {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  oven_code: string;

  @Column()
  description: string;

  @Column()
  type_oven: string;

  @Column()
  qty_zones: number;

  @Column()
  qty_pressure: number;

  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
