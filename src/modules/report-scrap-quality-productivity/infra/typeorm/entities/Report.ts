import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('trackings')
export default class Tracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_line' })
  lineId: number;

  @Column({ name: 'model_name' })
  modelName: string;

}

