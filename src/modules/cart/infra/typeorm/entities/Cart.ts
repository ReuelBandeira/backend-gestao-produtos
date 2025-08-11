// eslint-disable-next-line no-shadow
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';


@Entity('cart')
export default class CartCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  code_cart: string;

  @Column()
  status: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
