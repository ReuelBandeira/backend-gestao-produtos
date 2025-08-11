/* eslint-disable radix */

import { Request, Response } from 'express';
import { MaterialManagerRepository } from '../../typeorm/repositories/MaterialManagerRepository';

export default class ListProductsMaterialController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { list_code } = request.query;


    const materialRepository = new MaterialManagerRepository();


    const materialListProducts = await materialRepository.findByListProductsMaterial(
      list_code,
    );

    return response.status(200).json({ 'products' :materialListProducts});
  }
}
