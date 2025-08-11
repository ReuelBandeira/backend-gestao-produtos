

import { Repository, getRepository } from "typeorm";
import IAvailabilityPoLastThreeHourRepository from "@modules/views_oee/repositories/IAvailabilityPoLastThreeHourRepository";
import AvailabilityPoLastThreeHour from "../entities/AvailabilityPoLastThreeHour";

// const TOTAL_PER_PAGE = 11;

export default class AvailabilityPoLastThreeHourRepository implements IAvailabilityPoLastThreeHourRepository {
  private ormRepository: Repository<AvailabilityPoLastThreeHour>;

  constructor() {
    this.ormRepository = getRepository(AvailabilityPoLastThreeHour);

  }

  public async findViewsLinesAvailabilityPoLastThreeHour(id_line: number): Promise<AvailabilityPoLastThreeHour| AvailabilityPoLastThreeHour[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_availability_po_last_three_hour where id_line  = "'}${id_line}"`
    );
    return result;
  }

  public async allAvailabilityPoLastThreeHour(): Promise<AvailabilityPoLastThreeHour| AvailabilityPoLastThreeHour[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_availability_po_last_three_hour'}`
    );
    return result;
  }

}
