// eslint-disable-next-line no-shadow
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('msl_levels')
export default class Management {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: string;

  @Column()
  hours: number;

  @Column()
  percentage: number;

  // salvo em minutos
  @Column()
  time_baking: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @AfterLoad()
  listTimeBaking() {
    this.time_baking /= 60;
  }

  @BeforeInsert()
  insetTimeBaking() {
    this.time_baking *= 60;
  }

  @BeforeUpdate()
  updateTimeBaking() {
    this.time_baking *= 60;
  }
}
