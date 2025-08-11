import Line from '@modules/lines/infra/typeorm/entities/Line';
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

@Entity('machines_history_serial')
export default class HistoryMachineSN {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  serial_number: number;

  @Column()
  model: string;

  @Column()
  description: string

  @Column()
  manufacturer: string

  @Column()
  serial_machines: string

  @Column()
  voltage: string

  @Column()
  manufacturing_date: string

  @Column()
  status: string

  @Column()
  line_layout: string

  @JoinColumn({ name: 'id_line' })
  @ManyToOne(() => Line, (line) => line.id)
  line: Line;

  @Column()
  id_line: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
