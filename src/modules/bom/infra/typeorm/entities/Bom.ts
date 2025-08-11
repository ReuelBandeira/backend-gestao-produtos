import { ProductionOrder } from '@modules/production_orders/infra/typeorm/entities/ProductionOrders';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bom')
export class Bom {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column()
  struct_code: string;

  @Column()
  main_component: string;

  @Column()
  description: string;

  @Column()
  alternative_component: string;

  @Column()
  qty_used: number;

  @Column()
  status_bom: string;

  @Column()
  position_mec: string;

  @ManyToOne(
    () => ProductionOrder,
    (productProductionOrderionOrder) => productProductionOrderionOrder.bomlist,
  )
  @JoinColumn({ name: 'id_production_order' })
  productionOrder: ProductionOrder;

  @Column()
  id_production_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
