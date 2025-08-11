// eslint-disable-next-line no-shadow
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Product from '@modules/products/infra/typeorm/entities/Product';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import DetailMaterialEntrance from './DetailMaterialEntrance';

@Entity('material_entrance_smt')
export default class MaterialEntrance {
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
  kit_quantity: number;

  @Column()
  production_order: string;

  @Column()
  id_employee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
