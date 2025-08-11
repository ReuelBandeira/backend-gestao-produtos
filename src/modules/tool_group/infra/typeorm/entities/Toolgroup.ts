import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('toolgroup')
export default class Toolgroup {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  toolgroup_name: string;

  @Column()
  description_toolgroup: string;

  @Column({ default: false })
  isStencil: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
