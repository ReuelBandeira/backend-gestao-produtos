


import IDowtimeRankingTeamRepository from "@modules/views_oee/repositories/IDowtimeRankingTeamRepository";
import { Repository, getRepository } from "typeorm";
import DowtimeRankingTeam from "../entities/DowtimeRankingTeam";



// const TOTAL_PER_PAGE = 11;

export default class DowtimeRankingTeamRepository implements IDowtimeRankingTeamRepository {
  private ormRepository: Repository<DowtimeRankingTeam>;

  constructor() {
    this.ormRepository = getRepository(DowtimeRankingTeam);

  }

  public async findViewsIdLineDowntimeRankingTeam(id_line: number): Promise<DowtimeRankingTeam| DowtimeRankingTeam[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_dowtime_ranking_team  where id_line  = "'}${id_line}"`
    );
    return result;
  }

  public async allRankingDowntimeTeam(): Promise<DowtimeRankingTeam| DowtimeRankingTeam[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_dowtime_ranking_team'}`
    );
    return result;
  }

}
