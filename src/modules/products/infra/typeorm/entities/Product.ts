import FamilyRecord from '@modules/family_record/infra/typeorm/entities/FamilyRecord';
import SnComposition from '@modules/sn_composition/infra/typeorm/entities/SnComposition';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

// eslint-disable-next-line no-shadow
export enum ProductTypeSide {
  SINGLE = 'single',
  DOUBLE = 'double',
}

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  client: string;

  @Column({ nullable: true })
  type_plate: string;

  @Column({ nullable: true })
  code_pcba: string;

  @Column({ nullable: true })
  tag: string;

  @Column({ nullable: true })
  amount_parent: number

  @Column({ unique: true })
  product_name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ProductTypeSide,
    default: ProductTypeSide.SINGLE,
  })
  type_side: ProductTypeSide;

  @Column()
  exception: number;

  @Column()
  side_init: string;

  @Column()
  number_plates_panel: number;

  @OneToOne(() => SnComposition, (snComposition) => snComposition.product, { eager: true })
  snComposition: SnComposition;

  @JoinColumn({ name: 'id_family' })
  @ManyToOne(() => FamilyRecord, (family_record) => family_record.id)
  family_record: FamilyRecord;

  @Column()
  id_family: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
