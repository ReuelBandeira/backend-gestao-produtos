import Workgroup from '@modules/workgroups/infra/typeorm/entities/Workgroup';
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
import RouteHead from './RouteHead';

@Entity('route_body')
export default class RouteBody {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  route_head_id: number;

  @Column()
  workgroup_id: number;

  @Column()
  next_workgroup_id: number;

  @Column()
  isObligatory: boolean;

  @Column()
  hasRework: boolean;

  @Column()
  order: number;

  @ManyToOne(() => Workgroup, (workgroup) => workgroup.id)
  @JoinColumn({ name: 'workgroup_id' })
  workgroup: Workgroup;

  @ManyToOne(() => Workgroup, (workgroup) => workgroup.id)
  @JoinColumn({ name: 'next_workgroup_id' })
  workgroupNext: Workgroup;

  @ManyToOne(() => RouteHead, (route_head) => route_head.routes)
  @JoinColumn({ name: 'route_head_id' })
  routeHead: RouteHead;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
