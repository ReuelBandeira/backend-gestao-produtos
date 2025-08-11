
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_quality_origin'})
export default class QualityOrigin {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'origem'})
  origem: string;

  @Column({ name: 'dates'})
  dates: Date;

}
