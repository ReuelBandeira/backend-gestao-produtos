/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import ListOrderProductHourRepository from '../../typeorm/repositories/ListOrderProductHourRepository';


export default class ListOrderProductHourController {

  public async findLinesPoHours(request: Request, response: Response): Promise<Response> {
    const {id_line} = request.query;

    const model = new ListOrderProductHourRepository();

    const id_line_po_hours = await model.findViewsIdLineListPoHours(Number(id_line));

    return response.json({
      id_line_po_hours
    });
  }

  public async allPoListHours(request: Request, response: Response): Promise<Response> {

    const model = new ListOrderProductHourRepository();

    const all_po_list_hours = await model.allListPoHours();

    return response.json({
      all_po_list_hours
    });
  }


}

