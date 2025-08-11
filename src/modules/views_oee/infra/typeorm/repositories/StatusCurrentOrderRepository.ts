

// eslint-disable-next-line import/no-unresolved
import IStatusCurrentOrderRepository from "@modules/views_oee/repositories/IStatusCurrentOrderRepository";
import { Repository, getRepository } from "typeorm";
import StatusCurrentOrder from "../entities/StatusCurrentOrder";

// const TOTAL_PER_PAGE = 11;

export default class StatusCurrentOrderRepository implements IStatusCurrentOrderRepository {
  private ormRepository: Repository<StatusCurrentOrder>;

  constructor() {
    this.ormRepository = getRepository(StatusCurrentOrder);

  }

  public async findViewsLinesStatusCurrentOrder(id_line: number): Promise<StatusCurrentOrder| StatusCurrentOrder[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_status_current_order where id_line  = "'}${id_line}"`
    );
    return result;
  }

  public async allViewsLinesStatusCurrentOrder(): Promise<StatusCurrentOrder| StatusCurrentOrder[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_status_current_order'}`
    );
    return result;
  }


}
