
import ListOrderProductHour from '../infra/typeorm/entities/ListOrderProductHour';

export default interface IListOrderProductHourRepository {
  findViewsIdLineListPoHours(id_line: number): Promise<ListOrderProductHour | ListOrderProductHour[]>;
  allListPoHours(): Promise<ListOrderProductHour| ListOrderProductHour[]>;
}
