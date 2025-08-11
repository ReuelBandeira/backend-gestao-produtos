
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// eslint-disable-next-line no-shadow
export enum CauseType {
  TYPE_FEEDER = 'type_feeder',
  TYPE_PRODUCTION = 'type_production',
}

@Entity('cause')
export default class Cause {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column()
  code: string;

  @Column({
    type: 'enum',
    enum: CauseType,
    default: CauseType.TYPE_FEEDER,
  })
  type: CauseType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
