/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
// eslint-disable-next-line import/extensions
import QuantityCurrentOrderService from '@modules/views_oee/services/QuantityCurrentOrderService';
import { container } from 'tsyringe';
import QuantityCurrentOrderRepository from '../../typeorm/repositories/QuantityCurrentOrderRepository';
import QuantityCurrentOrderIdlineService from '@modules/views_oee/services/QuantityCurrentOrderIdlineService';


export default class QuantityCurrentOrderController {

  public async allQuantityCurrentOrder(request: Request, response: Response): Promise<Response> {
    // const { description,code } = request.query;

    const model = container.resolve(QuantityCurrentOrderService);

    const all_quantity_current_order = await model.execute();

    return response.status(201).json(all_quantity_current_order);
  }

  public async lineQuantityCurrentOrder(request: Request, response: Response): Promise<Response> {
    const {id_line} = request.query;

    const model = container.resolve(QuantityCurrentOrderIdlineService);

    const teste = await model.execute({
      id_line
    });

    return response.status(201).json(teste);
  }


}

