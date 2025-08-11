
import CauseCategory from '@modules/category_cause_downtime/infra/typeorm/entities/CauseCategory';
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


@Entity('cause_downtime')
export default class Cause {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => CauseCategory, (causeCategory) =>causeCategory.id)
  @JoinColumn({ name: 'id_category_cause' })
  causeCategory: CauseCategory;

  @Column()
  id_category_cause: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
