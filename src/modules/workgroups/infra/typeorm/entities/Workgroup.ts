import WorkStation from '@modules/workstations/infra/typeorm/entities/WorkStation';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('workgroups')
export default class Workgroup {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => WorkStation, (workstation) => workstation.workgroup, {
    cascade: true,
  })
  workstations: WorkStation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
