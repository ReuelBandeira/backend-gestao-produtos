

// eslint-disable-next-line import/no-unresolved
import IListOrderProductTeamRepository from "@modules/views_oee/repositories/IListOrderProductTeamRepository";
import { Repository, getRepository } from "typeorm";
import ListOrderProductTeam from "../entities/ListOrderProductTeam";

// const TOTAL_PER_PAGE = 11;

export default class ListOrderProductTeamRepository implements IListOrderProductTeamRepository {
  private ormRepository: Repository<ListOrderProductTeam>;

  constructor() {
    this.ormRepository = getRepository(ListOrderProductTeam);

  }

  public async findViewsLinesListOrderProductTeam(id_line: number): Promise<ListOrderProductTeam| ListOrderProductTeam[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_list_order_product_team  where id_line  = "'}${id_line}"`
    );
    return result;
  }

  public async allListOrderProductTeam(): Promise<ListOrderProductTeam| ListOrderProductTeam[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_list_order_product_team'}`
    );
    return result;
  }

}
