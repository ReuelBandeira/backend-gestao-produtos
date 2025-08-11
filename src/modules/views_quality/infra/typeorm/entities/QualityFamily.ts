
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_quality_family'})
export default class QualityFamily {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'familia' })
  familia: string;

  @Column({ name: 'dates'})
  dates: Date;

}
