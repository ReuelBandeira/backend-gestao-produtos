
import ListOrderProductOeeCurrentWeek from '../infra/typeorm/entities/ListOrderProductOeeCurrentWeek';

export default interface IListOrderProductOeeCurrentWeekRepository {
  findViewsLinesListOrderProductOeeCurrentWeek(id_line: number): Promise<ListOrderProductOeeCurrentWeek | ListOrderProductOeeCurrentWeek[]>;
}
