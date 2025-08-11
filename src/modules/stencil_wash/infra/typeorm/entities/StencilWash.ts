import CheckToolPrinter from '@modules/check_tool_printer/infra/typeorm/entities/CheckToolPrinter';
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import MachineRegisters from '@modules/machine_registers/infra/typeorm/entities/MachineRegisters';
import ToolingControl from '@modules/tooling_control/infra/typeorm/entities/ToolingControl';
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

@Entity('stencil_washes')
export default class StencilWash {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_tooling_control' })
  @ManyToOne(() => ToolingControl, (toolingControl) => toolingControl.id)
  toolingControl: ToolingControl;

  @Column()
  id_tooling_control: number;

  @JoinColumn({ name: 'id_machine' })
  @ManyToOne(() => MachineRegisters, (machineRegisters) => machineRegisters.id)
  machine: MachineRegisters;

  @Column()
  id_machine: number;

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

  checkToolPrinter: CheckToolPrinter;
}
