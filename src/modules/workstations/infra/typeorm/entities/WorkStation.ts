import Workgroup from '@modules/workgroups/infra/typeorm/entities/Workgroup';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('workstations')
export default class WorkStation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToOne(() => Workgroup, (workgroup) => workgroup.workstations)
  @JoinColumn({ name: 'workgroup_id' })
  workgroup: Workgroup;

  @Column()
  workgroup_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
