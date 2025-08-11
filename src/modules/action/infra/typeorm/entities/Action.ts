// eslint-disable-next-line no-shadow
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// eslint-disable-next-line no-shadow
export enum ActionType {
  TYPE_FEEDER = 'type_feeder',
  TYPE_PRODUCTION = 'type_production',
}

@Entity('action')
export default class Action {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column()
  code: string;

  @Column({
    type: 'enum',
    enum: ActionType,
    default: ActionType.TYPE_FEEDER,
  })
  type: ActionType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
