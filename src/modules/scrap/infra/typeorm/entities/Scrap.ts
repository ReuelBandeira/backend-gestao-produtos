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

@Entity('scraps')
export default class Scrap {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  serial_number: string;

  @Column({ nullable: true })
  number_plates_panel?: number;

  @Column()
  material_quantity: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  list_code?: string;

  @Column()
  reason: string;

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
