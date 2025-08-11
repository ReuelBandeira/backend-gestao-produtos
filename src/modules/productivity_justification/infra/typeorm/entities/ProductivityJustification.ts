import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import Shift from '@modules/shifts/infra/typeorm/entities/Shift';
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

@Entity('productivity_justification')
export default class ProductivityJustification {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  hour: string;

  @Column()
  day: string;

  @Column()
  planned: number;

  @Column()
  produced: number;

  @Column()
  los: number;

  @Column()
  justification: string;

  @JoinColumn({ name: 'id_shift' })
  @ManyToOne(() => Shift, (shift) => shift.id)
  shift: Shift;

  @Column()
  id_shift: number;

  @JoinColumn({ name: 'id_line' })
  @ManyToOne(() => Line, (line) => line.id)
  line: Line;

  @Column()
  id_line: number;

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
