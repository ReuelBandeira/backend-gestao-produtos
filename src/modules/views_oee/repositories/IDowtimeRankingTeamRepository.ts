
import DowtimeRankingTeam from '../infra/typeorm/entities/DowtimeRankingTeam';

export default interface IDowtimeRankingTeamRepository {
  findViewsIdLineDowntimeRankingTeam(id_line: number): Promise<DowtimeRankingTeam | DowtimeRankingTeam[]>;
  allRankingDowntimeTeam(): Promise<DowtimeRankingTeam | DowtimeRankingTeam[]>;
}
