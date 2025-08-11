
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_quality_monitors_input'})
export default class QualityMonitorsInput {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'name'})
  name: string;

  @Column({ name: 'dates'})
  dates: Date;

}
