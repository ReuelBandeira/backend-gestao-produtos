

import { Repository, getRepository } from "typeorm";

import IMaintenanceOpenDwRepository from "@modules/views_maintenance/repositories/IMaintenanceOpenDwRepository";
import MaintenanceOpenDw from "../entities/MaintenanceOpenDw";

// const TOTAL_PER_PAGE = 11;

export default class MaintenanceOpenDwRepository implements IMaintenanceOpenDwRepository {
  private ormRepository: Repository<MaintenanceOpenDw>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceOpenDw);

  }
  findViewsIdLineListPoHours(id_line: number): Promise<MaintenanceOpenDw | MaintenanceOpenDw[]> {
    throw new Error("Method not implemented.");
  }
  allListPoHours(): Promise<MaintenanceOpenDw | MaintenanceOpenDw[]> {
    throw new Error("Method not implemented.");
  }

  public async maintenanceOpenDw(dateStart: Date, dateEnd: Date): Promise<{ count: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");
    const result = await this.ormRepository
      .createQueryBuilder('vw_maintenance_open_dw')
      .select([
        'COUNT(*) AS count'
      ])
      .where('vw_maintenance_open_dw.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

    return result.map(item => ({
      count: parseInt(item.count)
    }));
  }

}
