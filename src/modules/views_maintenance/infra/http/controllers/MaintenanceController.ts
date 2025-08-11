/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import MaintenanceRepository from '../../typeorm/repositories/MaintenanceAlldwRepository';
import MaintenanceTechnicianRepository from '../../typeorm/repositories/MaintenanceTechnicianRepository';
import MaintenanceOpenDwRepository from '../../typeorm/repositories/MaintenanceOpenDwRepository';



export default class MaintenanceController {

  public async allDw(request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd} = request.query;

    const model_maintenance_all_dw = new MaintenanceRepository();

    const model_maintenance_open_dw = new MaintenanceOpenDwRepository();

    const model_maintenance = new MaintenanceTechnicianRepository();

    const maintenance_all_dw = await model_maintenance_all_dw.maintenanceAllDw(dateStart,dateEnd);
    const maintenance_open_dw = await model_maintenance_open_dw.maintenanceOpenDw(dateStart,dateEnd);
    const maintenance_technician = await model_maintenance.maintenanceTechnician(dateStart,dateEnd);

    return response.json({
      maintenance_all_dw,
      maintenance_open_dw,
      maintenance_technician
    });
  }



}

