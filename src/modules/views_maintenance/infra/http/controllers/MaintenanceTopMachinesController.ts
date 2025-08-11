/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import MaintenanceTopMachinesRepository from '../../typeorm/repositories/MaintenanceTopMachinesRepository';
import MaintenanceTeamRepository from '../../typeorm/repositories/MaintenanceTeamRepository';



export default class MaintenanceTopMachinesController {

  public async MachinesMaintenanceTop(request: Request, response: Response): Promise<Response> {

    const {dateStart,dateEnd} = request.query;

    const model_maintenance_top_machines = new MaintenanceTopMachinesRepository();

    const model_maintenance_team = new MaintenanceTeamRepository();

    const maintenance_top_machines = await model_maintenance_top_machines.maintenanceTopMachines(dateStart,dateEnd);
    const maintenance_team = await  model_maintenance_team.maintenanceTeam(dateStart,dateEnd);


    return response.json({
      maintenance_top_machines,
      maintenance_team
    });
  }


}

