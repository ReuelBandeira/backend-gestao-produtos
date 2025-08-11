
import ListOrderProduct from '../infra/typeorm/entities/ListOrderProduct';

export default interface IListOrderProductRepository {
  findViewsLinesListOrderProduct(id_line: number): Promise<ListOrderProduct | ListOrderProduct[]>;

}
