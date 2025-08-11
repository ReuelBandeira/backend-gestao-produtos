// import Products from '@modules/products/infra/typeorm/entities/Product';


import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// eslint-disable-next-line no-shadow
export enum ProviderTypePaste {
  LEAD_FREE = 'lead free',
  TIM_LEAD = 'tim lead',
}

@Entity('provider')
export default class Provider {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  provider_name: string;

  @Column()
  description_provider: string;

  @Column({
    type: 'enum',
    enum: ProviderTypePaste,
    default: ProviderTypePaste.LEAD_FREE,
  })
  type_paste: ProviderTypePaste;

  @Column()
  acronym: string;

  @Column()
  protocol:string;

  @Column()
  turns_on:string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
