
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_quality_all_defects'})
export default class QualityAllDefects {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'defeitos' })
  defeitos: Date;

  @Column({ name: 'model_name' })
  model_name: Date;

}
