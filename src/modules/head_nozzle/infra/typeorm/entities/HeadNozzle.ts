// eslint-disable-next-line no-shadow
import Model from '@modules/model/infra/typeorm/entities/Model';
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


@Entity('head_nozzle')
export default class HeadNozzle {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({name: 'id_model' })
  @ManyToOne(() => Model ,(model) => model.id)
  model:Model;

  @Column()
  id_model: number;

  @Column()
  serial_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
