import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_dowtime_ranking_op' })
export default class DowtimeRankingOp {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  idLine: number;

  @Column({ name: 'id_cause' })
  idCause: number;

  @Column({ name: 'occurrence' })
  occurrence: number;

  @Column({ name: 'description_cause' })
  descriptionCause: string;

  @Column({ name: 'ranking' })
  ranking: number;
}
