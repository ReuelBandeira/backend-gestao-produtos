import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Modules from '@modules/module_machines/infra/typeorm/entities/Modules';


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
import MachineRegisters from './MachineRegisters';




@Entity('machine_registers_modules')
export default class MachineRegistersModules{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @JoinColumn({ name: 'id_machine_registers' })
  @ManyToOne(() => MachineRegisters, (machineRegisters) => machineRegisters.id)
  machineRegisters: MachineRegisters;

  @JoinColumn({ name: 'id_module' })
  @ManyToOne(() => Modules, (modules) => modules.id)
  modules: Modules;

  @Column()
  id_machine_registers: number;

  @Column()
  id_module: number;

  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
