
import ListOrderProductTeam from '../infra/typeorm/entities/ListOrderProductTeam';

export default interface IListOrderProductTeamRepository {
  findViewsLinesListOrderProductTeam(id_line: number): Promise<ListOrderProductTeam | ListOrderProductTeam[]>;
  allListOrderProductTeam(): Promise<ListOrderProductTeam | ListOrderProductTeam[]>;
}
