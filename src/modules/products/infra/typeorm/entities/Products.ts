/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-shadow
import Category from '@modules/categorys/infra/typeorm/entities/Category';
import { Length } from 'class-validator';
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

@Entity('products')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(() => Category, (categorys) => categorys.id)
  category: Category;

  @Column({ length: 50 })
  @Length(1, 50, {
    message: 'O nome deve ter no minimo 1 no máximo 50 caracteres.',
  })
  name: string;

  @Column({ length: 200 })
  @Length(1, 200, {
    message: 'A descrição deve ter no minimo 1 no máximo 200 caracteres.',
  })
  description: string;

  @Column()
  price: number;

  @Column()
  expirationDate: Date;

  @Column()
  image: string;

  @Column()
  categoryId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
