import ICreateSnCompositionDTO from '@modules/sn_composition/dtos/ICreateSnCompositionDTO';
import CreateSnCompositionService from '@modules/sn_composition/services/CreateSnCompositionService';
import DeleteSnCompositionService from '@modules/sn_composition/services/DeleteSnCompositionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SnCompositionRepository from '../../typeorm/repositories/SnCompositionRepository';

export default class SnCompositionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateSnCompositionDTO;

    const { id: id_employee } = request.user

    const createSnCompositionService = container.resolve(CreateSnCompositionService);

    const snComposition = await createSnCompositionService.execute({ ...data, id_employee });

    return response.status(201).json(snComposition);
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const snCompositionRepository = new SnCompositionRepository();

    const snCompositions = await snCompositionRepository.findAllSnCompositionsNotPaginate();

    return response.status(200).json(snCompositions);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { product } = request.query;

    const snCompositionRepository = new SnCompositionRepository();

    const snCompositions = await snCompositionRepository.findBySearch(String(product));

    return response.status(200).json(snCompositions);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSnCompositionService = container.resolve(DeleteSnCompositionService);

    await deleteSnCompositionService.execute(Number(id));

    return response.status(200).json();
  }
}
