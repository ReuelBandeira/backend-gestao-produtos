/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-shadow

import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categorys')
export default class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  @Length(1, 100, {
    message: 'O nome deve ter no minimo 1 e no máximo 100 caracteres.',
  })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
