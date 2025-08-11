

import { Repository, getRepository } from "typeorm";
import MaintenanceMttr from "../entities/MaintenanceMttr";
// eslint-disable-next-line import/no-unresolved


// const TOTAL_PER_PAGE = 11;

export default class MaintenanceMtbfRepository  {
  private ormRepository: Repository<MaintenanceMttr>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceMttr);

  }

  public async MaintenanceMttr(dateStart: Date, dateEnd: Date): Promise<{ quantidade: number, intervalo: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");

    const result = await this.ormRepository
      .createQueryBuilder('vw_maintenance_mttr')
      .select([
        'SUM(vw_maintenance_mttr.intervalo) as intervalo',
        'COUNT(*) as quantidade'
      ])
      .where('vw_maintenance_mttr.stop_start_date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawOne();

    return {
      quantidade: Number(result.quantidade),
      intervalo: Number(result.intervalo)
    };
  }










}
