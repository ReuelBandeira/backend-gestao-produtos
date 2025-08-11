/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import StatusCurrentOrderRepository from '../../typeorm/repositories/StatusCurrentOrderRepository';
// eslint-disable-next-line import/extensions



export default class StatusCurrentOrderController {

  public async findLinesStatusCurrentOrder(request: Request, response: Response): Promise<Response> {
    const { lines } = request.body;

    const model = new StatusCurrentOrderRepository();

    const status_current_order= await model.allViewsLinesStatusCurrentOrder();

    const current_order = [];
          // eslint-disable-next-line no-restricted-syntax
          for (const line of lines) {
            const { id_line } = line;
            // eslint-disable-next-line func-names
            const list = status_current_order.filter(function(item: { id_line: unknown; }){
              // eslint-disable-next-line eqeqeq
              return (item.id_line == id_line);
            });
            current_order.push(...list);
          }

    return response.json({
      status_current_order:current_order
    });
  }

  public async allLinesStatusCurrentOrder(request: Request, response: Response): Promise<Response> {
    const model = new StatusCurrentOrderRepository();

    const all_status_current_order= await model.allViewsLinesStatusCurrentOrder();

    return response.json({
      all_status_current_order
    });
  }


}

