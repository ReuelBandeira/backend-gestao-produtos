import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import { Feeder } from '@modules/feeder/infra/typeorm/entities/Feeder';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('smt_material_manager_setup')
export class MaterialManagerSetup {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column()
  list_code: string;

  @Column()
  machine: string;

  @Column()
  module: string;

  @Column()
  side: number;

  @Column() // qty_slots
  position: number;

  @JoinColumn({ name: 'id_feeder' })
  @OneToOne(() => Feeder, (feeder) => feeder.id)
  feeder: Feeder;

  @Column()
  id_feeder: number;

  @Column()
  component: string;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_employee: number;

  @JoinColumn({ name: 'id_line' })
  @ManyToOne(() => Line, (line) => line.id)
  line: Line;

  @Column()
  id_line: number;

  @Column()
  status: string;

  @Column()
  sequential: string;

  @Column()
  qr_code_information: string;

  @Column()
  component_quantity: number;

  @Column()
  feeder_pitch: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
