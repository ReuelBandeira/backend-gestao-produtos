
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_quality_defects_position'})
export default class QualityAllDefects {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'mechanical_position' })
  mechanical_position: string;

  @Column({ name: 'dates' })
  dates: Date;

}
