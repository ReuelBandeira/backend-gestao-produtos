/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import AvailabilityPoLastThreeHourRepository from '../../typeorm/repositories/AvailabilityPoLastThreeHourRepository';



export default class AvailabilityPoLastThreeHourController {

  public async findLinesAvailabilityPoLastThreeHour(request: Request, response: Response): Promise<Response> {
    const {id_line} = request.query;

    const model = new AvailabilityPoLastThreeHourRepository();

    const id_line_availability_po_Last = await model.findViewsLinesAvailabilityPoLastThreeHour(Number(id_line));

    return response.json({
      id_line_availability_po_Last
    });
  }

  public async allPoListHours(request: Request, response: Response): Promise<Response> {

    const model = new AvailabilityPoLastThreeHourRepository();

    const availability_po_Last_three_hour = await model.allAvailabilityPoLastThreeHour();

    return response.json({
      availability_po_Last_three_hour
    });
  }


}

