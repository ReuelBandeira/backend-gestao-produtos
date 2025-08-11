/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateWorkStationService from '@modules/workstations/services/CreateWorkStationService';
import DeleteWorkStationService from '@modules/workstations/services/DeleteWorkStationService';
import WorkStationRepository from '../../typeorm/repositories/WorkStationRepository';

export default class WorkStationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, workgroup_id } = request.body;

    const createWorkStation = container.resolve(CreateWorkStationService);

    const workStation = await createWorkStation.execute({ name, workgroup_id });

    return response.status(201).json(workStation);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workStationRepository = new WorkStationRepository();

    const workStations = await workStationRepository.findAll();

    return response.json(workStations);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const idParsed = parseInt(id);
    const deleteWorkStation = container.resolve(DeleteWorkStationService);

    await deleteWorkStation.execute({ id: idParsed });

    return response.status(204).json({});
  }
}
