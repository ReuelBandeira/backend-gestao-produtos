import Line from "@modules/lines/infra/typeorm/entities/Line";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('critical_components')
export default class CriticalComponent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  component: string;

  @Column()
  component_description: string;

  @Column()
  component_quantity: number;

  @Column()
  component_quantity_bom: number;

  @Column({ default: 90 })
  usage_percentage: number;

  @Column()
  used_quantity: number;

  @Column()
  kit_quantity: number;

  @Column()
  list_code: string;

  @Column({ nullable: true })
  id_line: number;

  @Column()
  machine: string;

  @Column()
  module: string;

  @Column()
  side: string;

  @Column()
  position: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Line, (line) => line.id)
  @JoinColumn({ name: 'id_line' })
  line: Line;
}
