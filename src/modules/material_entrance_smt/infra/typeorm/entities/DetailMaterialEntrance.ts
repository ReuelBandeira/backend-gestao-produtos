// eslint-disable-next-line no-shadow
import Employee from '@modules/employee/infra/typeorm/entities/Employee';

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
import MaterialEntrance from './MaterialEntrance';

@Entity('detail_material_entrance_smt')
export default class DetailMaterialEntrance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => MaterialEntrance, (materialEntrance) => materialEntrance.id)
  @JoinColumn({ name: 'id_material_entrance_smt' })
  materialEntrance: MaterialEntrance;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_material_entrance_smt: number;

  @Column()
  component: string;

  @Column()
  string_qr_code: string;

  @Column()
  serial_component: string;

  @Column()
  component_quantity: number;

  @Column()
  uc_code: string;

  @Column()
  main_component: string;

  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
