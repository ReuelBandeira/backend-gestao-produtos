import Employee from '@modules/employee/infra/typeorm/entities/Employee';
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

@Entity('solder_paste')
export default class SolderPaste {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  id_provider: number;

  @JoinColumn({ name: 'id_provider' })
  @ManyToOne(() => Provider, (provider) => provider.id)
  provider: Provider;

  @Column({
    type: 'enum',
    enum: ProviderTypePaste,
    default: ProviderTypePaste.LEAD_FREE,
  })
  type_paste: ProviderTypePaste;

  @Column()
  id_employee: number;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
