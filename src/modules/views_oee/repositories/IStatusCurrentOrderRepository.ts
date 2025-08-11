
import StatusCurrentOrder from '../infra/typeorm/entities/StatusCurrentOrder';

export default interface IStatusCurrentOrderRepository {
  findViewsLinesStatusCurrentOrder(id_line: number): Promise<StatusCurrentOrder | StatusCurrentOrder[]>;

}
