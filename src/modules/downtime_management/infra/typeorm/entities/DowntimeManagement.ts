// eslint-disable-next-line import/no-unresolved

import Cause from '@modules/cause_downtime/infra/typeorm/entities/Cause';
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Line from '@modules/lines/infra/typeorm/entities/Line';
// eslint-disable-next-line import/no-unresolved
import Action from '@modules/action_downtime/infra/typeorm/entities/Action';
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

import Departament from '@modules/employee/infra/typeorm/entities/Departament';
import Type from '@modules/type_downtime/infra/typeorm/entities/Type';


@Entity('dowtime_management')
export default class DowntimeManagement{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @JoinColumn({ name: 'id_line' })
  @ManyToOne(() => Line, (lines) => lines.id)
  line: Line;

  @JoinColumn({name: 'id_cause' })
  @ManyToOne(() => Cause ,(cause) => cause.id)
  cause:Cause ;

  @JoinColumn({name: 'id_machine' })
  @ManyToOne(() => MachineRegisters, (machine_registers) => machine_registers.id)
  machine_registers:MachineRegisters ;

  @JoinColumn({name: 'id_action' })
  @ManyToOne(() => Action ,(action) => action.id)
  action:Action;

  @JoinColumn({name: 'id_department' })
  @ManyToOne(() => Departament ,(departments) => departments.id)
  departments:Departament;

  @JoinColumn({name: 'id_type' })
  @ManyToOne(() => Type ,(type) => type.id)
  type:Type;

  @Column()
  id_department: number;

  @Column()
  id_type: number;

  @Column()
  reason: string;

  @Column()
  stop_start_date: string;

  @Column()
  id_line: number;

  @Column()
  id_machine: number;

  @Column()
  equipment: string;

  @Column()
  module: string;

  @Column()
  final_stop_date: string;

  @Column()
  status: string;

  @Column()
  name_machine: string;

  @Column()
  id_cause: number;

  @Column()
  id_employee: number;

  @Column()
  id_employee_checkin: number;

  @Column()
  id_employee_closed: number;

  @Column()
  date_accompanying_checkin: string;

  @Column()
  serial_number: string;

  @Column()
  component: string;

  @Column()
  id_action: number;

  @Column()
  comment: string;

  @Column()
  zone_type: string;

  @Column()
  post: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
