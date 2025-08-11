// eslint-disable-next-line no-shadow
import Action from '@modules/action/infra/typeorm/entities/Action';
import Cause from '@modules/cause/infra/typeorm/entities/Cause';
import Defect from '@modules/defect/infra/typeorm/entities/Defect';
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
import HeadNozzle from './HeadNozzle';


@Entity('head_nozzle_maintenance')
export default class MaintenanceHeadNozzle {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({name: 'id_head_nozzle' })
  @ManyToOne(() =>  HeadNozzle, ( headNozzle) => headNozzle.id)
  headNozzle:  HeadNozzle;

  @JoinColumn({name: 'id_cause' })
  @ManyToOne(() => Cause , (cause) => cause.id)
  cause:Cause ;

  @JoinColumn({name: 'id_action' })
  @ManyToOne(() => Action , (action) => action.id)
  action:Action ;

  @JoinColumn({name: 'id_defect' })
  @ManyToOne(() => Defect , (defect) => defect.id)
  defect:Defect ;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_head_nozzle: number;

  @Column()
  id_action: number;

  @Column()
  id_cause: number;

  @Column()
  id_defect: number;

  @Column()
  type_maintenance: string;

  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
