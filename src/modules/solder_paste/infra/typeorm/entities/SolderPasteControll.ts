import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import Provider from '@modules/solder_paste/infra/typeorm/entities/Provider';

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

export enum ProviderTypePaste {
  LEAD_FREE = 'lead_free',
  TIM_LEAD = 'tim_lead',
}

@Entity('solder_paste_controll')
export default class SolderPasteControll {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: ProviderTypePaste,
    default: ProviderTypePaste.LEAD_FREE,
  })
  type_paste: ProviderTypePaste;

  @Column()
  serial_paste: string;

  @CreateDateColumn()
  datetime_freezer: Date;

  @CreateDateColumn()
  datetime_unfreezer: Date;

  @CreateDateColumn()
  datetime_use: Date;

  @CreateDateColumn()
  datetime_label_printing: Date;

  @Column()
  status: string;

  @Column()
  id_employee: number;

  @Column()
  discard_status:string;

  @Column()
  datetime_discard:Date;

  @Column()
  id_employee_discard:number;

  @Column()
  description_discard:string;

  @Column()
  expiration_date: string;

  @Column()
  manufacturing_date: string;

  @Column()
  lot_number: number;

  @Column()
  weight: number;

  @Column()
  datetime_use_line: Date;

  @Column()
  id_employee_freezer :number;

  @Column()
  id_employee_unfreezer :number;

  @Column()
  id_employee_use :number;

  @Column()
  id_line :number;

  @Column()
  lower_freezer_status:string;

  @Column()
  datetime_lower_freezer:Date;

  @Column()
  description_lower_freezer: string;

  @Column()
  id_employee_lower_freezer:number;

  @Column()
  quantity_mixer:number;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @JoinColumn({ name: 'id_employee_freezer' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee_freezer: Employee;

  @JoinColumn({ name: 'id_employee_unfreezer' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee_unfreezer: Employee;

  @JoinColumn({ name: 'id_employee_use' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee_use: Employee;

  @JoinColumn({ name: 'id_line' })
  @ManyToOne(() => Line, (line) => line.id)
  lines: Line;

  @JoinColumn({ name: 'id_employee_lower_freezer' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee_lower_freezer: Employee;

  @Column()
  status_mixer:string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  id_provider: number;

  @JoinColumn({ name: 'id_provider' })
  @ManyToOne(() => Provider, (prov) => prov.id)
  provider: Provider;
}
