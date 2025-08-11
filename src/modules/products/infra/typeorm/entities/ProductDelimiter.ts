

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
import Product from './Product';
import Employee from '@modules/employee/infra/typeorm/entities/Employee';


@Entity('product_delimiter')
export default class ProductDelimiter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_product' })
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @JoinColumn({ name: 'id_employee' })
  @ManyToOne(() => Employee, (user) => user.id)
  employee: Employee;

  @Column()
  id_product: number;

  @Column()
  delimiter: string;

  @Column()
  position_quantity: number;

  @Column()
  type: string;

  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
