
import QuantityCurrentOrder from '../infra/typeorm/entities/QuantityCurrentOrder';

export default interface IQuantityCurrentOrderRepository {
  findViewsLinesQuantityCurrentOrder(id_line: number): Promise<QuantityCurrentOrder | QuantityCurrentOrder[]>;
  numberPlates(startHour:string,endHour:string): Promise<QuantityCurrentOrder[]>;
  findTarget(): Promise<QuantityCurrentOrder[]>;
  findStatus(): Promise<QuantityCurrentOrder[]>;

}
