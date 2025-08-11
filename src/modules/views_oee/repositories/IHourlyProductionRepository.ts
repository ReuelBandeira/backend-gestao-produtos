
import HourlyProduction from '../infra/typeorm/entities/HourlyProduction';

export default interface IHourlyProductionDetailRepository {
  findAllViewsLinesHourlyProduction(): Promise<HourlyProduction[]>;
}
