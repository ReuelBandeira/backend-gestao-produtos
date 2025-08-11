

// eslint-disable-next-line import/no-unresolved
import IHourlyProductionDetailRepository from "@modules/views_oee/repositories/IHourlyProductionDetailRepository";
import { Repository, getRepository } from "typeorm";
import HourlyProductionDetail from "../entities/HourlyProductionDetail";

// const TOTAL_PER_PAGE = 11;

export default class HourlyProductionDetailRepository implements IHourlyProductionDetailRepository {
  private ormRepository: Repository<HourlyProductionDetail>;

  constructor() {
    this.ormRepository = getRepository(HourlyProductionDetail);

  }

  public async findAllViewsLinesHourlyProductionDetail(): Promise<HourlyProductionDetail| HourlyProductionDetail[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_hourly_production_detail'}`
    );
    return result;
  }


}
