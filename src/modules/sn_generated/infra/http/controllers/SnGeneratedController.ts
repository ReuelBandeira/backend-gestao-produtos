import ICreateSnGeneratedDTO from '@modules/sn_generated/dtos/ICreateSnGeneratedDTO';
import CreateSnGeneratedService from '@modules/sn_generated/services/CreateSnGeneratedService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SnGeneratedRepository from '../../typeorm/repositories/SnGeneratedRepository';

export default class SnGeneratedController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateSnGeneratedDTO;

    const { id: id_employee } = request.user

    const createSnGeneratedService = container.resolve(CreateSnGeneratedService);

    const snGenerated = await createSnGeneratedService.execute({ ...data, id_employee });

    return response.status(201).json(snGenerated);
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const { id_production_order } = request.query

    const snGeneratedRepository = new SnGeneratedRepository();

    const snGenarateds = await snGeneratedRepository.findByProductionOrder(Number(id_production_order));

    return response.status(200).json(snGenarateds);
  }
}
