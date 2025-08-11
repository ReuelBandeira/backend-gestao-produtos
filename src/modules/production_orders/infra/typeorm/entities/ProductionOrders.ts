import { Bom } from '@modules/bom/infra/typeorm/entities/Bom';
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import Product from '@modules/products/infra/typeorm/entities/Product';
import RouteHead from '@modules/route/infra/typeorm/entities/RouteHead';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('production_order')
export class ProductionOrder {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column({ unique: true })
  mo_code: string;

  @Column()
  mo_status: string;

  @Column()
  target_qty: number;

  @Column()
  mo_start_date: Date;

  @Column()
  mo_close_date: Date;

  @Column({ default: 0 })
  input_qty: number;

  @Column({ default: 0 })
  output_qty: number;

  @Column({ default: 'MULTILASER' })
  customer: string;

  @Column()
  mo_prevision_start_date: Date;

  @Column()
  process_number: string;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_employee: number;

  @JoinColumn({ name: 'id_route_code' })
  @ManyToOne(() => RouteHead, (routeHead) => routeHead.id)
  routeHead: RouteHead;

  @Column()
  id_route_code: number;

  @JoinColumn({ name: 'id_product' })
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column()
  id_product: number;

  @OneToMany(() => Bom, (bom) => bom.productionOrder, {
    cascade: true,
  })
  bomlist: Bom[];

  @Column()
  type: string;

  @CreateDateColumn()
  mo_created: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
