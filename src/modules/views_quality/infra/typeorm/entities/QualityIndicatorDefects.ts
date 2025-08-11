
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_quality_indicator_defects'})
export default class QualityIndicatorDefects {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line'})
  id_line: number;

  @Column({ name: 'line_name'})
  line_name: string;

  @Column({ name: 'model_name'})
  model_name: string;

  @Column({ name: 'defeitos'})
  defeitos: Date;



}
