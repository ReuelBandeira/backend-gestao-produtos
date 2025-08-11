/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import ListOrderProductTeamRepository from '../../typeorm/repositories/ListOrderProductTeamRepository';


export default class ListOrderProductTeamController {

  public async findLinesListOrderProductTeam(request: Request, response: Response): Promise<Response> {
    const {id_line} = request.query;

    const model = new ListOrderProductTeamRepository();

    const id_line_list_order_product_team = await model.findViewsLinesListOrderProductTeam(Number(id_line));

    return response.json({
      id_line_list_order_product_team
    });
  }

  public async allListOrderProductTeam(request: Request, response: Response): Promise<Response> {

    const model = new ListOrderProductTeamRepository();

    const list_order_product_team = await model.allListOrderProductTeam();

    return response.json({
      list_order_product_team
    });
  }


}

