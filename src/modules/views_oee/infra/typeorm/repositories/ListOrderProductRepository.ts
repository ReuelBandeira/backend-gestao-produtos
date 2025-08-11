

// eslint-disable-next-line import/no-unresolved
import IListOrderProductRepository from "@modules/views_oee/repositories/IListOrderProductRepository";
import { Repository, getRepository } from "typeorm";
import ListOrderProduct from "../entities/ListOrderProduct";

// const TOTAL_PER_PAGE = 11;

export default class ListOrderProductRepository implements IListOrderProductRepository {
  private ormRepository: Repository<ListOrderProduct>;

  constructor() {
    this.ormRepository = getRepository(ListOrderProduct);

  }

  public async findViewsLinesListOrderProduct(id_line: number): Promise<ListOrderProduct| ListOrderProduct[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_list_order_product where id_line  = "'}${id_line}"`
    );
    return result;
  }


}
