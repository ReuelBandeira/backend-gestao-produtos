/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
// eslint-disable-next-line import/extensions
import ListOrderProductRepository from '../../typeorm/repositories/ListOrderProductRepository';


export default class ListOrderProductController {

  public async findLinesListOrderProduct(request: Request, response: Response): Promise<Response> {
    const {id_line} = request.query;

    const model = new ListOrderProductRepository();

    const id_line_list_order_product= await model.findViewsLinesListOrderProduct(Number(id_line));

    const lastItem = id_line_list_order_product.pop();  // Remove o último item do array
    id_line_list_order_product.unshift(lastItem);     // Adiciona o item removido como o primeiro item

    return response.json({
      id_line_list_order_product
    });
  }


}

