

import { Repository, getRepository } from "typeorm";
// eslint-disable-next-line import/no-unresolved
import IMaintenanceMtbfRepository from "@modules/views_maintenance/repositories/IMaintenanceMtbfRepository";
import MaintenanceMtbf from "../entities/MaintenanceMtbf";

// const TOTAL_PER_PAGE = 11;

export default class MaintenanceMtbfRepository implements IMaintenanceMtbfRepository {
  private ormRepository: Repository<MaintenanceMtbf>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceMtbf);

  }

  public async MaintenanceMtbf(dateStart: Date, dateEnd: Date): Promise<{ quantidade: number, intervalo: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");

    const result = await this.ormRepository
      .createQueryBuilder('vw_maintenance_mtbf')
      .select([
        'SUM(vw_maintenance_mtbf.intervalo) as intervalo',
        'COUNT(*) as quantidade'
      ])
      .where('vw_maintenance_mtbf.dates BETWEEN :startDate AND :endDate', {
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
