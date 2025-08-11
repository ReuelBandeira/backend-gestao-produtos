/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
// eslint-disable-next-line import/extensions
import HourlyProductionDetailRepository from '../../typeorm/repositories/HourlyProductionDetailRepository';
import HourlyProductionDetail from '../../typeorm/entities/HourlyProductionDetail';


export default class HourlyProductionDetailController {





  public async allLinesOEEDetailRegisters(request: Request, response: Response): Promise<Response> {

    const model = new HourlyProductionDetailRepository();

    const oee_detail = await model.findAllViewsLinesHourlyProductionDetail();

    return response.json({
      oee_detail
    });
  }



}

