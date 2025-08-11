import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tmp_machines')
export class Machine {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column()
  name: string;

  @Column({ default: 'M1' })
  machine_code: string;

  @Column()
  side: number;

  @Column()
  qty_slots: number;

  @Column()
  tray_module_position: string;

  @Column()
  customer_code: string;

  @Column()
  multilaser_code: string;

  @Column()
  alternative_component: string;

  @Column()
  feeder_code: string;

  @Column()
  thickness: string;

  @Column()
  feed_pitch: number;

  @Column()
  qty: number;

  @Column()
  status: string;

  @Column()
  side_product: string;

  @Column()
  struct_bom_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
