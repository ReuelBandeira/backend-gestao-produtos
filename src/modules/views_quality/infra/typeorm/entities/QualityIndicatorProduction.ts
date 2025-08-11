import { Column, Entity, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import QualityIndicatorDefects from './QualityIndicatorDefects';
import QualityIndicatorShot from './QualityIndicatorShot';

@Entity({ name: 'vw_quality_indicator_production' })
export default class QualityIndicatorProduction {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  id_line: number;

  @Column({ name: 'line_name' })
  line_name: string;

  @Column({ name: 'model_name' })
  model_name: string;

  @Column({ name: 'dates' })
  dates: Date;

  @JoinColumn({ name: 'model_name', referencedColumnName: 'model_name' })
  @OneToOne(() => QualityIndicatorDefects)
  defeitos: QualityIndicatorDefects;

  @JoinColumn({ name: 'model_name', referencedColumnName: 'model_name' })
  @OneToOne(() => QualityIndicatorShot)
  shots: QualityIndicatorShot;
}



