import Line from '@modules/lines/infra/typeorm/entities/Line';
import { ProductionOrder } from '@modules/production_orders/infra/typeorm/entities/ProductionOrders';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { Squeegees } from '@modules/squeegees/infra/typeorm/entities/Squeegees';
import ToolingControl from '@modules/tooling_control/infra/typeorm/entities/ToolingControl';
import Toolgroup from '@modules/tool_group/infra/typeorm/entities/Toolgroup';
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

@Entity('check_tool_printer')
export default class CheckToolPrinter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'id_product' })
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column()
  id_product: number;

  @JoinColumn({ name: 'id_toolgroup' })
  @ManyToOne(() => Toolgroup, (toolgroup) => toolgroup.id)
  toolgroup: Toolgroup;

  @Column()
  id_toolgroup: number;

  @JoinColumn({ name: 'id_tooling_control' })
  @ManyToOne(() => ToolingControl, (toolingControl) => toolingControl.id)
  toolingControl: ToolingControl;

  @Column()
  id_tooling_control: number;

  @JoinColumn({ name: 'id_squeegee' })
  @ManyToOne(() => Squeegees, (squeegees) => squeegees.id)
  squeegee: Squeegees;

  @Column()
  id_squeegee: number;

  @JoinColumn({ name: 'id_production_order' })
  @ManyToOne(() => ProductionOrder, (productionOrder) => productionOrder.id)
  production_order: ProductionOrder;

  @Column()
  id_production_order: number;

  @JoinColumn({ name: 'id_line' })
  @ManyToOne(() => Line, (line) => line.id)
  line: Line;

  @Column()
  id_line: number;

  @Column()
  list_code: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
