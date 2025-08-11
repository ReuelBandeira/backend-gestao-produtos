/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import DowtimeRankingOpRepository from '../../typeorm/repositories/DowtimeRankingOpRepository';

export default class DowtimeRankingOpController {

  public async findViewsIdDowntimeRanking(request: Request, response: Response): Promise<Response> {
    const {id_line} = request.query;

    const model = new DowtimeRankingOpRepository();

    const id_dowtime_ranking_op = await model.findViewsIdlineDowntime(Number(id_line));

    return response.json({
      id_dowtime_ranking_op
    });
  }

  public async allDowntimeRanking(request: Request, response: Response): Promise<Response> {

    const model = new ViewsRepository();

    const all_dowtime_ranking_op = await model.allRankingDowntimeOp();

    return response.json({
      all_dowtime_ranking_op
    });
  }


}
