
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// eslint-disable-next-line no-shadow
export enum DefectType {
  TYPE_FEEDER = 'type_feeder',
  TYPE_PRODUCTION = 'type_production',
}

@Entity('defect')
export default class Defect {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column()
  code: string;

  @Column({
    type: 'enum',
    enum: DefectType,
    default: DefectType.TYPE_FEEDER,
  })
  type: DefectType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
