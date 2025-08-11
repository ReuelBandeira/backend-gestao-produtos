import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import RouteBody from './RouteBody';

@Entity('route_head')
export default class RouteHead {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @OneToMany(() => RouteBody, (routeBody) => routeBody.routeHead, {
    cascade: true,
  })
  routes: RouteBody[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
