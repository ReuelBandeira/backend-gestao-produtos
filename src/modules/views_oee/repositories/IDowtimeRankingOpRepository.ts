
import DowtimeRankingOp from '../infra/typeorm/entities/DowtimeRankingOp';

export default interface IDowtimeRankingOpRepository {
  findViewsIdlineDowntime(id_line: number): Promise<DowtimeRankingOp | DowtimeRankingOp[]>;
  allRankingDowntimeOp(): Promise<DowtimeRankingOp | DowtimeRankingOp[]>;
}
