import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Line from '@modules/lines/infra/typeorm/entities/Line';



import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// eslint-disable-next-line no-shadow
export enum StatusType {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}


@Entity('machine_registers')
export default class MachineRegisters{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @JoinColumn({ name: 'id_line' })
  @ManyToOne(() => Line, (lines) => lines.id)
  line: Line;

  @Column()
  model: string;

  @Column()
  description: string;

  @Column()
  manufacturer: string;

  @Column()
  serial_number: string;

  @Column()
  voltage: string;

  @Column()
  id_line: number;

  @Column()
  manufacturing_date: string;

  @Column()
  id_employee: number;


  @Column({
    type: 'enum',
    enum: StatusType,

  })
  status: StatusType;

  @Column()
  line_layout: number;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
