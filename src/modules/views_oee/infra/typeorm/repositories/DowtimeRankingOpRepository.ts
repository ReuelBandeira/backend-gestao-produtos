
// eslint-disable-next-line import/no-unresolved

import { getRepository, Repository } from 'typeorm';
import IDowtimeRankingOpRepository from '@modules/views_oee/repositories/IDowtimeRankingOpRepository';
import DowtimeRankingOp from '../entities/DowtimeRankingOp';


// const TOTAL_PER_PAGE = 11;

export default class DowtimeRankingOpRepository implements IDowtimeRankingOpRepository {
  private ormRepository: Repository<DowtimeRankingOp>;

  constructor() {
    this.ormRepository = getRepository(DowtimeRankingOp);

  }

  public async findViewsIdlineDowntime(id_line: number): Promise<DowtimeRankingOp| DowtimeRankingOp[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_dowtime_ranking_op  where id_line  = "'}${id_line}"`
    );
    return result;
  }

  public async allRankingDowntimeOp(): Promise<DowtimeRankingOp| DowtimeRankingOp[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_dowtime_ranking_op'}`
    );
    return result;
  }

}
