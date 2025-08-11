// eslint-disable-next-line no-shadow
import CartCategory from '@modules/cart/infra/typeorm/entities/Cart';
import Line from '@modules/lines/infra/typeorm/entities/Line';
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


@Entity('cart_criticals')
export default class CartCritical {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  component: string;

  @Column()
  component_quantity: number;

  @Column({ default: 70 })
  usage_percentage: number;

  @Column({ nullable: true })
  quantity_kit: number;

  @Column({ nullable: true })
  used_quantity: number;

  @Column({ nullable: true })
  list_code: string;

  @Column()
  id_cart: number

  @Column({ nullable: true })
  id_line: number

  @JoinColumn({ name: 'id_line' })
  @ManyToOne(() => Line, (line) => line.id)
  line: Line;

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
