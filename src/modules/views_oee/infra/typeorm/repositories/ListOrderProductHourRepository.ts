

import { Repository, getRepository } from "typeorm";
import IListOrderProductHourRepository from "@modules/views_oee/repositories/IListOrderProductHourRepository";
import ListOrderProductHour from "../entities/ListOrderProductHour";

// const TOTAL_PER_PAGE = 11;

export default class ListOrderProductHourRepository implements IListOrderProductHourRepository {
  private ormRepository: Repository<ListOrderProductHour>;

  constructor() {
    this.ormRepository = getRepository(ListOrderProductHour);

  }

  public async findViewsIdLineListPoHours(id_line: number): Promise<ListOrderProductHour| ListOrderProductHour[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_list_order_product_hour where id_line  = "'}${id_line}"`
    );
    return result;
  }

  public async allListPoHours(): Promise<ListOrderProductHour| ListOrderProductHour[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_list_order_product_hour'}`
    );
    return result;
  }

}
