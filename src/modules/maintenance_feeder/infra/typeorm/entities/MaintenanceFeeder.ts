import Action from '@modules/action/infra/typeorm/entities/Action';
import Cause from '@modules/cause/infra/typeorm/entities/Cause';
import Defect from '@modules/defect/infra/typeorm/entities/Defect';
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import { Feeder } from '@modules/feeder/infra/typeorm/entities/Feeder';



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
export enum MaintenanceType {
  PREVENTIVE = 'preventive',
  CORRECTIVE = 'corrective',
}


@Entity('maintenance_feeder')
export default class MaintenanceFeeder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({name: 'id_feeders' })
  @ManyToOne(() => Feeder, (feeders) => feeders.id)
  feeders: Feeder;

  @JoinColumn({name: 'id_cause' })
  @ManyToOne(() => Cause , (cause) => cause.id)
  cause:Cause ;

  @JoinColumn({name: 'id_defect' })
  @ManyToOne(() => Defect , (defect) => defect.id)
  defect:Defect ;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_feeders: number;

  @Column()
  id_cause: number;

  @Column()
  id_defect: number;

  @Column({
    type: 'enum',
    enum: MaintenanceType,
    default: MaintenanceType.PREVENTIVE,
  })
  type_maintenance: MaintenanceType;

  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  maintenance_feeder_id: any;
}
