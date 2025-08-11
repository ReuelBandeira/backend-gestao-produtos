import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('type_feeder')
export class TypeFeeder {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
