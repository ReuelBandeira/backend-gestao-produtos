import { Request, Response } from 'express';
import { TypeFeederRepository } from '../../typeorm/repositories/TypeFeederRepository';

export default class TypeFeederController {
  async index(request: Request, response: Response): Promise<Response> {
    const typeFeederRepository = new TypeFeederRepository();

    const typeFeeder = await typeFeederRepository.findAllTypeFeeder();

    return response.json(typeFeeder);
  }
}
