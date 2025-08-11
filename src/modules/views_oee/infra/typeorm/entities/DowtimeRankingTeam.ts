import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vw_dowtime_ranking_team' })
export default class DowtimeRankingTeam {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'id_line' })
  id_line: number;

  @Column({ name: 'id_cause' })
  id_cause: number;

  @Column({ name: 'occurrence' })
  occurrence: number;

  @Column({ name: 'description_cause' })
  description_cause: string;

  @Column({ name: 'ranking' })
  ranking: number;
}
