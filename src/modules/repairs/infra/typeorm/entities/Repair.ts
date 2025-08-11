import Cause from '@modules/cause/infra/typeorm/entities/Cause';
import Defect from '@modules/defect/infra/typeorm/entities/Defect';
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Origin from '@modules/origins/infra/typeorm/entities/Origin';
import Solution from '@modules/solutions/infra/typeorm/entities/Solution';
import Tracking from '@modules/trackings/infra/typeorm/entities/Tracking';
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

@Entity('repairs')
export default class Repair {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_tracking' })
  @ManyToOne(() => Tracking, (tracking) => tracking.id)
  tracking: Tracking;

  @Column()
  id_tracking: number;

  @JoinColumn({ name: 'id_defect' })
  @ManyToOne(() => Defect, (defect) => defect.id)
  defect: Defect;

  @Column()
  id_defect: number;

  @JoinColumn({ name: 'id_operator' })
  @ManyToOne(() => Employee, (employee) => employee.id)
  operator: Employee;

  @Column()
  id_operator: number;

  @Column({ nullable: true })
  observation_technical: string

  // Update

  @JoinColumn({ name: 'id_technical' })
  @ManyToOne(() => Employee, (employee) => employee.id)
  technical: Employee;

  @Column({ nullable: true })
  id_technical?: number;

  @JoinColumn({ name: 'id_repairman' })
  @ManyToOne(() => Employee, (employee) => employee.id)
  repairman: Employee;

  @Column({ nullable: true })
  id_repairman?: number;

  @JoinColumn({ name: 'id_cause' })
  @ManyToOne(() => Cause, (cause) => cause.id)
  cause: Cause;

  @Column({ nullable: true })
  id_cause?: number;

  @JoinColumn({ name: 'id_solution' })
  @ManyToOne(() => Solution, (solution) => solution.id)
  solution: Solution;

  @Column({ nullable: true })
  id_solution?: number;

  @JoinColumn({ name: 'id_origin' })
  @ManyToOne(() => Origin, (origin) => origin.id)
  origin: Origin;

  @Column({ nullable: true })
  id_origin?: number;

  @Column({ nullable: true, length: 50 })
  mechanical_position?: string;

  @Column({ nullable: true, length: 280 })
  observation?: string;

  @Column({ nullable: true, length: 100 })
  mechanical_position_repairman?: string;

  @JoinColumn({ name: 'id_employee_origin' })
  @ManyToOne(() => Employee, (employee) => employee.id)
  employee_origin: Employee;

  @Column({ nullable: true })
  id_employee_origin?: number;


  @JoinColumn({ name: 'defect_origin' })
  @ManyToOne(() => Origin, (defect_origins) =>defect_origins.id)
  defect_origins: Origin;

  @Column({ nullable: true })
  defect_origin?: number;

  @Column({ nullable: true, length: 150 })
  module?: string

  @Column()
  date_repair: Date;

  @Column()
  date_defect_origin: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  serial_son?: string;

  @Column()
  fase?: number;





}
