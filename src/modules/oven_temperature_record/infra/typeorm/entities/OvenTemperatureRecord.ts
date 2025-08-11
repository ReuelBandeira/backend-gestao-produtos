// eslint-disable-next-line no-shadow
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Oven from '@modules/oven/infra/typeorm/entities/Oven';
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


@Entity('oven_temperature_record')
export default class OvenTemperatureRecord {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({name: 'id_oven' })
  @ManyToOne(() => Oven ,(oven) => oven.id)
  oven:Oven;

  @JoinColumn({ name: 'user_approver_1' })
  @ManyToOne(() => Employee, (user) => user.id)
  userApprover_1: Employee;

  @JoinColumn({ name: 'user_approver_2' })
  @ManyToOne(() => Employee, (user) => user.id)
  userApprover_2: Employee;

  @JoinColumn({ name: 'user_approver_3' })
  @ManyToOne(() => Employee, (user) => user.id)
  userApprover_3: Employee;

  @Column()
  list_code: string;

  @Column()
  struct_code: string;

  @Column()
  id_oven: number;

  @Column()
  pressure_1: string;

  @Column()
  pressure_2: string;

  @Column()
  pressure_3: string;

  @Column()
  pressure_4: string;

  @Column()
  speed: string;

  @Column()
  user_approver_1: number;

  @Column()
  user_approver_2: number;

  @Column()
  user_approver_3: number;

  @Column()
  date_approver_1: Date;

  @Column()
  date_approver_2: Date;

  @Column()
  date_approver_3: Date;

  @Column()
  zone_1: string;

  @Column()
  zone_2: string;

  @Column()
  zone_3: string;

  @Column()
  zone_4: string;

  @Column()
  zone_5: string;

  @Column()
  zone_6: string;

  @Column()
  zone_7: string;

  @Column()
  zone_8: string;

  @Column()
  zone_9: string;

  @Column()
  zone_10: string;

  @Column()
  zone_11: string;

  @Column()
  zone_12: string;

  @Column()
  zone_13: string;



  @Column()
  observation_2: string;

  @Column()
  observation_3: string;

  @Column()
  status_approver_2 : string;

  @Column()
  status_approver_3 : string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
