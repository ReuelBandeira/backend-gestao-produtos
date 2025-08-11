
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_quality_team'})
export default class QualityTeam {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'turno'})
  turno: number;

  @Column({ name: 'dates'})
  dates: Date;

}
