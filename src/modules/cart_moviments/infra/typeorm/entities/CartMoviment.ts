// eslint-disable-next-line no-shadow
import CartCategory from '@modules/cart/infra/typeorm/entities/Cart';
import CartShelf from '@modules/cart/infra/typeorm/entities/CartShelf';
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';


@Entity('cart_moviments')
export default class CartMoviment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  qrcode: string;

  @Column()
  component: string;

  @Column()
  component_quantity: number;

  @Column()
  component_sequential: string;

  @Column()
  position: number

  @Column()
  entrance_date: Date

  @Column({ nullable: true })
  removal_date: Date

  @Column()
  status: number;

  @Column()
  status_cart: string;

  @Column()
  list_code: string

  @Column()
  id_cart: number

  @Column()
  id_shelf: number

  @Column()
  id_employee_entrance: number

  @Column({ nullable: true })
  id_employee_removal: number

  @JoinColumn({ name: 'id_employee_removal' })
  @ManyToOne(() => Employee, (employee) => employee.id)
  employeeRemoval: Employee;

  @JoinColumn({ name: 'id_employee_entrance' })
  @ManyToOne(() => Employee, (employee) => employee.id)
  employeeEntrance: Employee;

  @JoinColumn({ name: 'id_shelf' })
  @ManyToOne(() => CartShelf, (cartShelf) => cartShelf.id)
  cartShelf: CartShelf;

  @JoinColumn({ name: 'id_cart' })
  @ManyToOne(() => CartCategory, (cartCategory) => cartCategory.id)
  cart: CartCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
