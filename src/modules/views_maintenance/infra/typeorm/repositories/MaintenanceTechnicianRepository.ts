

import { Repository, getRepository } from "typeorm";

import IMaintenanceTechnicianRepository from "@modules/views_maintenance/repositories/IMaintenanceTopMachinesRepository";
import MaintenanceTechnician from "../entities/MaintenanceTechnician";

// const TOTAL_PER_PAGE = 11;

export default class MaintenanceTechnicianRepository implements IMaintenanceTechnicianRepository {
  private ormRepository: Repository<MaintenanceTechnician>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceTechnician);

  }

  public async maintenanceTechnician(dateStart: Date, dateEnd: Date): Promise<{ tecnico: string, count: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");
    const result = await this.ormRepository
      .createQueryBuilder('vw_maintenance_technician')
      .select([
        'tecnico',
        'COUNT(*) AS count'
      ])
      .where('vw_maintenance_technician.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('tecnico')
      .getRawMany();

      return result.map(item => ({
        tecnico: item.tecnico,
        count: parseInt(item.count)
      }));
  }

}
