import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import MachineRegisters from '@modules/machine_registers/infra/typeorm/entities/MachineRegisters';


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

@Entity('solder_paste_mixer')
export default class SolderPasteMixer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  serial_paste: string;

  @CreateDateColumn()
  id_machine: number;

  @CreateDateColumn()
  input_date: Date;

  @CreateDateColumn()
  exit_date: Date;

  @CreateDateColumn()
  id_employee_input: number;

  @CreateDateColumn()
  id_employee_exit: number;

  @JoinColumn({ name: 'id_employee_input'})
  @ManyToOne(() => Employee, (user) => user.id)
  employee_input: Employee;

  @JoinColumn({ name: 'id_employee_exit'})
  @ManyToOne(() => Employee, (user) => user.id)
  employee_exit: Employee;

  @JoinColumn({name: 'id_machine' })
  @ManyToOne(() => MachineRegisters, (machine_registers) => machine_registers.id)
  machine_registers:MachineRegisters ;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
