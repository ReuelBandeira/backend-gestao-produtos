import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeFeeder } from './TypeFeeder';

@Entity('feeders')
export class Feeder {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column({ unique: true })
  feeder_code: string;

  @Column()
  status: string;

  @Column()
  mouting_limit: number;

  @Column()
  used_qty: number;

  @ManyToOne(() => TypeFeeder, (typeFeeder) => typeFeeder.id)
  @JoinColumn({ name: 'id_type_feeder' })
  typefeeder: TypeFeeder;

  @Column()
  id_type_feeder: number;

  @Column()
  used_qty_total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
