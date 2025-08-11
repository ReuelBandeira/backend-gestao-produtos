import CheckToolPrinter from '@modules/check_tool_printer/infra/typeorm/entities/CheckToolPrinter';
import Products from '@modules/products/infra/typeorm/entities/Product';
import Toolgroup from '@modules/tool_group/infra/typeorm/entities/Toolgroup';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('tooling_control')
export default class ToolingControl {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_product' })
  @ManyToOne(() => Products, (products) => products.id)
  product: Products;

  @JoinColumn({ name: 'id_toolgroup' })
  @ManyToOne(() => Toolgroup, (toolgroup) => toolgroup.id)
  toolgroup: Toolgroup;

  @OneToMany(
    () => CheckToolPrinter,
    (checkToolPrinter) => checkToolPrinter.toolingControl,
    {
      cascade: true,
    }
  )
  checkToolPrinters: CheckToolPrinter[];

  @Column()
  id_product: number;

  @Column()
  id_toolgroup: number;

  @Column()
  description_tooling_control: string;

  @Column()
  status: string;

  @Column()
  amount_used: number;

  @Column()
  usage_limit: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
