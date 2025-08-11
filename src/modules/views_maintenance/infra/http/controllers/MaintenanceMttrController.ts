/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import MaintenanceMttrRepository from '../../typeorm/repositories/MaintenanceMttrRepository';




export default class MaintenanceMttrController {

  public async allMaintenanceMttr(request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd} = request.query;

    const model_maintenance_mttr = new MaintenanceMttrRepository();

    const maintenance_mttr= await model_maintenance_mttr.MaintenanceMttr(dateStart,dateEnd);

    maintenance_mttr.hours = (maintenance_mttr.intervalo / maintenance_mttr.quantidade) / 3600; // Divide by 3600 to convert seconds to hours

    return response.json({
      maintenance_mttr,
    });
  }


}

