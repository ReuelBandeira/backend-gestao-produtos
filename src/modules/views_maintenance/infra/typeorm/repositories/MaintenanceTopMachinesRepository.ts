

import { Repository, getRepository } from "typeorm";

import IMaintenanceTopMachinesRepository from "@modules/views_maintenance/repositories/IMaintenanceTopMachinesRepository";
import MaintenanceTopMachines from "../entities/MaintenanceTopMachines";

export default class MaintenanceTopMachinesRepository implements IMaintenanceTopMachinesRepository {
  private ormRepository: Repository<MaintenanceTopMachines>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceTopMachines);

  }

    public async maintenanceTopMachines(dateStart: Date, dateEnd: Date): Promise<{maquina: string, count: number }[]> {
      const startDate = String(dateStart).concat("T00:00:00.000Z");
      const endDate = String(dateEnd).concat("T23:59:59.999Z");
      const result = await this.ormRepository.query(
        'SELECT maquina, COUNT(*) AS count FROM vw_maintenance_top_machines WHERE dates BETWEEN ? AND ? GROUP BY maquina ORDER BY count DESC',
        [startDate, endDate]
      );
      return result.map(item => ({
        maquina: item.maquina,
        count: parseInt(item.count)
      }));
    }

}
