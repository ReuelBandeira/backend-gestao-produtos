// eslint-disable-next-line no-shadow
import CartCategory from '@modules/cart/infra/typeorm/entities/Cart';
import CartShelfCategory from '@modules/cart/infra/typeorm/entities/CartShelf';
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


@Entity('cart_manage_shelf')
export default class CartMngShelf {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_cart' })
  @ManyToOne(() => CartCategory, (cartCategory) =>cartCategory.id)
  cartCategory: CartCategory;

  @Column()
  id_cart: number;
  // relacionamento com a tablea carrinho


  @JoinColumn({ name: 'id_cart_shelf' })
  @ManyToOne(() => CartShelfCategory, (cartShelfCategory) =>cartShelfCategory.id)
  cartShelfCategory: CartShelfCategory;

  @Column()
  id_cart_shelf: number;
  // relacionamento com a table shelf

  @Column()
  qty_position: number;

  // retirar o update do codigo da tabela cart
  // fazer o relacionamento das tabelas | entities ok | migrations ok
  // metodo get na tabela de prateleira
  // fazer um relatório diário

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
