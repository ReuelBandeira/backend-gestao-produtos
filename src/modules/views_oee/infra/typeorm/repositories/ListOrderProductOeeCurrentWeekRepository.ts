

// eslint-disable-next-line import/no-unresolved
import IListOrderProductOeeCurrentWeekRepository from "@modules/views_oee/repositories/IListOrderProductOeeCurrentWeekRepository";
import { Repository, getRepository } from "typeorm";
import ListOrderProductOeeCurrentWeek from "../entities/ListOrderProductOeeCurrentWeek";

// const TOTAL_PER_PAGE = 11;

export default class ListOrderProductOeeCurrentWeekRepository implements IListOrderProductOeeCurrentWeekRepository {
  private ormRepository: Repository<ListOrderProductOeeCurrentWeek>;

  constructor() {
    this.ormRepository = getRepository(ListOrderProductOeeCurrentWeek);

  }

  public async findViewsLinesListOrderProductOeeCurrentWeek(id_line: number): Promise<ListOrderProductOeeCurrentWeek| ListOrderProductOeeCurrentWeek[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_list_order_product_oee_current_week where id_line  = "'}${id_line}"`
    );
    return result;
  }


}
