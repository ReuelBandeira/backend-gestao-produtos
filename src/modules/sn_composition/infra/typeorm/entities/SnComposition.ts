import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import Product from '@modules/products/infra/typeorm/entities/Product';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sn_composition')
export default class SnComposition {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  array_format_sn: string;

  @JoinColumn({ name: 'id_product' })
  @OneToOne(() => Product)
  product: Product;

  @Column()
  id_product: number;

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

  @AfterLoad()
  jsonTranform() {
    this.array_format_sn = JSON.parse(this.array_format_sn)
  }

}
