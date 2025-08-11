
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_quality_fail_mode'})
export default class QualityFailMode {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'defect' })
  defect: string;

  @Column({ name: 'dates'})
  dates: Date;

}
