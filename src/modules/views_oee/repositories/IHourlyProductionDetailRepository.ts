
import HourlyProductionDetail from '../infra/typeorm/entities/HourlyProductionDetail';

export default interface IHourlyProductionRepository {
  findAllViewsLinesHourlyProductionDetail(): Promise<HourlyProductionDetail | HourlyProductionDetail[]>;

}
