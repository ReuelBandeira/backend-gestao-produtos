import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ICreateOriginDTO from '@modules/origins/dtos/ICreateOriginDTO';
import CreateOriginService from '@modules/origins/services/CreateOriginService';
import OriginRepository from '../../typeorm/repositories/OtiginRepository';
import UpdateOriginService from '@modules/origins/services/UpdateOriginService';
import DeleteOriginService from '@modules/origins/services/DeleteOriginService';

export default class OriginController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateOriginDTO;

    const createOrigin = container.resolve(CreateOriginService);

    const origin = await createOrigin.execute(data);

    return response.status(201).json(origin);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const originRepository = new OriginRepository();

    const { page } = request.query;

    const { origins, totalPages, totalOrigins } =
      await originRepository.findAllOrigins(Number(page));

    return response.status(200).json({
      origins,
      totalPages,
      totalOrigins,
    });
  }

  public async indexCodes(request: Request, response: Response): Promise<Response> {
    const {type} = request.query;

    const originRepository = new OriginRepository();

    const origin = await originRepository.findAllOriginsNotPaginate(String(type));


    return response.status(200).json(origin);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { code } = request.query;

    const originRepository = new OriginRepository();

    const origin = await originRepository.findBySearch(String(code));

    return response.status(200).json(origin);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description,type } = request.body;

    const updateOrigin = container.resolve(UpdateOriginService);

    const origin = await updateOrigin.execute({
      id: Number(id),
      description,
      type
    });

    return response.status(200).json(origin);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOrigin = container.resolve(DeleteOriginService);

    await deleteOrigin.execute(Number(id));

    return response.status(200).json();
  }
}
