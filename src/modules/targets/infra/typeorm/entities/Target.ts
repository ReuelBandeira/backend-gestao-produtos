import Line from '@modules/lines/infra/typeorm/entities/Line';
import Product from '@modules/products/infra/typeorm/entities/Product';
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

@Entity('targets')
export default class Target {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  target: number;

  @JoinColumn({ name: 'id_line' })
  @ManyToOne(() => Line, (line) => line.id)
  line: Line;

  @Column()
  id_line: number;

  @JoinColumn({ name: 'id_product' })
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column()
  id_product: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
