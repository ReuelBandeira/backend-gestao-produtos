// eslint-disable-next-line no-shadow
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import WorkStation from '@modules/workstations/infra/typeorm/entities/WorkStation';
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


@Entity('plate_washing')
export default class PlateWashing {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  // @JoinColumn({ name: 'workstations' })
  // @ManyToOne(() => WorkStation, (workstation) => workstation.id)
  // workstation: WorkStation;

  @Column()
  id_workstations: number;

  @Column()
  serial_number_plate: string;

  @Column()
  main_component: string;

  @Column()
  struct_code: string;

  @Column()
  list_code: string;

  @Column()
  quantity_component: number;

  @Column()
  id_employee: number;

  @Column()
  number_plates_panel: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
