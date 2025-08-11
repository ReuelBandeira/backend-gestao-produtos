/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import FindCartCriticalService from '@modules/cart_criticals/services/FindCartCriticalService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CartCriticalController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findCartCriticalService = container.resolve(FindCartCriticalService);

    const components = await findCartCriticalService.execute()

    return response.status(200).json(components);
  }
}

