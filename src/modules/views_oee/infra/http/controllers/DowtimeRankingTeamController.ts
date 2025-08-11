/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import DowtimeRankingTeamRepository from '../../typeorm/repositories/DowtimeRankingTeamRepository';


export default class DowtimeRankingTeamController {

  public async findDowtimeRankingTeamLine(request: Request, response: Response): Promise<Response> {
    const {id_line} = request.query;

    const model = new DowtimeRankingTeamRepository();

    const id_dowtime_ranking_team = await model.findViewsIdLineDowntimeRankingTeam(Number(id_line));

    return response.json({
      id_dowtime_ranking_team
    });
  }

  public async allDowtimeRankingTeam(request: Request, response: Response): Promise<Response> {

    const model = new DowtimeRankingTeamRepository();

    const all_dowtime_ranking_team = await model.allRankingDowntimeTeam();

    return response.json({
      all_dowtime_ranking_team
    });
  }


}
