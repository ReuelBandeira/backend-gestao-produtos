
import Provider from '@modules/solder_paste/infra/typeorm/entities/Provider';
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


@Entity('product_provider_solder_paste')
export default class ProductProviderSolderPaste {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_product' })
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @JoinColumn({ name: 'id_provider' })
  @ManyToOne(() => Provider, (provider) => provider.id)
  provider: Provider;

  @Column()
  id_product: number;

  @Column()
  id_provider: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
