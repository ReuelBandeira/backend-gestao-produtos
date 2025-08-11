/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import ListOrderProductOeeCurrentWeekRepository from '../../typeorm/repositories/ListOrderProductOeeCurrentWeekRepository';


export default class ListOrderProductOeeCurrentWeekController {

  public async findLinesListOrderProductOeeCurrentWeek(request: Request, response: Response): Promise<Response> {
    const {id_line} = request.query;

    const model = new ListOrderProductOeeCurrentWeekRepository();

    const id_line_list_po_oee_current_week = await model.findViewsLinesListOrderProductOeeCurrentWeek(Number(id_line));

    return response.json({
      id_line_list_po_oee_current_week
    });
  }


}

