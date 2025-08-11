import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('squeegees')
export class Squeegees {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  code_squeegee: string;

  @Column()
  description_squeegee: string;

  @Column()
  status: string;

  @Column()
  usage_limit: number;

  @Column()
  amount_used: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
