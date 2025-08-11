import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import { ProductionOrder } from '@modules/production_orders/infra/typeorm/entities/ProductionOrders';
import Product from '@modules/products/infra/typeorm/entities/Product';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sn_generated')
export default class SnGenerated {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  serial_number: string;

  @Column()
  sequential: string;

  @Column({ nullable: true })
  isUsed: boolean;

  @Column({ nullable: true })
  date_used: Date;

  @JoinColumn({ name: 'id_production_order' })
  @ManyToOne(() => ProductionOrder, (productionOrder) => productionOrder.id)
  productionOrder: ProductionOrder;

  @Column()
  id_production_order: number;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;

  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
