import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('smt_material_manager')
export class MaterialManager {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column()
  list_code: string;

  @Column()
  main_components: string;

  @Column()
  alternative_components: string;

  @Column()
  struct_code: string;

  @Column()
  machine: string;

  @Column()
  tray_module_position: string;

  @Column()
  status: string;

  @Column()
  status_component: string;

  @Column()
  side: number;

  @Column()
  side_product: string;

  @Column()
  side_product_hidden: string;

  @Column()
  module: string;

  @Column() // qty_slots
  position: number;

  @Column() // qty
  quantity: number;

  @Column()
  width: string;

  @Column() // qty
  feeder_pitch: number;

  @Column()
  oven_profile: string;

  url: string

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_employee: number;

  @Column()
  version: number;

  @Column()
  id_feeder: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  qtyTop: number;

  @Column()
  qtyBot: number;

  @AfterLoad()
  addPathFile() {
    if (this.oven_profile !== null) {
      this.url = `${process.env.SERVER_URL}/statics/${this.oven_profile}`
    }
  }

}
