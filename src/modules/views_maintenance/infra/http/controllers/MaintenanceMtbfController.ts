/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import MaintenanceMtbfRepository from '../../typeorm/repositories/MaintenanceMtbfRepository';




export default class MaintenanceMtbfController {

  public async allMtbf(request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd} = request.query;

    const model_maintenance_mtbf = new MaintenanceMtbfRepository();

    const maintenance_mtbf= await model_maintenance_mtbf.MaintenanceMtbf(dateStart,dateEnd);

    maintenance_mtbf.hours = (maintenance_mtbf.intervalo / maintenance_mtbf.quantidade) / 3600; // Divide by 3600 to convert seconds to hours

    return response.json({
      maintenance_mtbf,
    });
  }



}

