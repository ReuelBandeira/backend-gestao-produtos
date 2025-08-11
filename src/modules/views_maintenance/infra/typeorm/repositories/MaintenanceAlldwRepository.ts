

import { Repository, getRepository } from "typeorm";
import IMaintenanceAlldwRepository from "@modules/views_maintenance/repositories/IMaintenanceAlldwRepository";
import MaintenanceAlldw from "../entities/MaintenanceAlldw";

// const TOTAL_PER_PAGE = 11;

export default class MaintenanceAlldwRepository implements IMaintenanceAlldwRepository {
  private ormRepository: Repository<MaintenanceAlldw>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceAlldw);

  }
  findViewsIdLineListPoHours(id_line: number): Promise<MaintenanceAlldw | MaintenanceAlldw[]> {
    throw new Error("Method not implemented.");
  }
  allListPoHours(): Promise<MaintenanceAlldw | MaintenanceAlldw[]> {
    throw new Error("Method not implemented.");
  }

  public async maintenanceAllDw(dateStart: Date, dateEnd: Date): Promise<{ count: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");
    const result = await this.ormRepository
      .createQueryBuilder('vw_maintenance_all_dw')
      .select([
        'COUNT(*) AS count'
      ])
      .where('vw_maintenance_all_dw.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

    return result.map(item => ({
      count: parseInt(item.count)
    }));
  }









}
