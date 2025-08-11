


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


// eslint-disable-next-line no-shadow
export enum ProviderTypePaste {
  LEAD_FREE = 'lead_free',
  TIM_LEAD = 'tim_lead',
}

@Entity('solder_paste_type_time')
export default class ConfigureSoldePasteTime {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: ProviderTypePaste,
    default: ProviderTypePaste.LEAD_FREE,
  })
  type_paste: ProviderTypePaste;

  @CreateDateColumn()
  thaw_time: number;

  @CreateDateColumn()
  time_use_with_lid_closed: number;

  @CreateDateColumn()
  time_use_with_lid_open: number;

  @CreateDateColumn()
  id_employee: number;

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
