

import { Repository, getRepository } from "typeorm";

import IMaintenanceTeamRepository from "@modules/views_maintenance/repositories/IMaintenanceTeamRepository";
import MaintenanceTeam from "../entities/MaintenanceTeam";

// const TOTAL_PER_PAGE = 11;

export default class MaintenanceTeamRepository implements IMaintenanceTeamRepository {
  private ormRepository: Repository<MaintenanceTeam>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceTeam);

  }

  public async maintenanceTeam(dateStart: Date, dateEnd: Date): Promise<{ turno: number, count: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");
    const result = await this.ormRepository
      .createQueryBuilder('vw_maintenance_team')
      .select([
        'turno',
        'COUNT(*) AS count'
      ])
      .where('vw_maintenance_team.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('turno')
      .getRawMany();

      return result.map(item => ({
        turno: item.turno,
        count: parseInt(item.count)
      }));
  }

}
