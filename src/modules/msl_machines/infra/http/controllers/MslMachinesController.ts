/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateMslMachinesService from '@modules/msl_machines/services/CreateMslMachinesService';
import UpdateMslMachinesService from '@modules/msl_machines/services/UpdateMslMachinesService';
import DeleteMslMachinesService from '@modules/msl_machines/services/DeleteMslMachinesService';
import MslMachinesRepository from '../../typeorm/repositories/MslMachinesRepository';

export default class MslMachinesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { machine, type } = request.body;

    const createMslMachines = container.resolve(CreateMslMachinesService);

    const { id: id_employee } = request.user;

    const machines = await createMslMachines.execute({
      machine,
      type,
      id_employee,
    });

    return response.status(201).json(machines);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const machinesRepository = new MslMachinesRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const { machines, totalPages, totalMachines } =
      await machinesRepository.findAllMslMachines(p);

    return response.json({
      machines,
      totalPages,
      totalMachines,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { machine } = request.query;

    const machineRepository = new MslMachinesRepository();

    const machines = await machineRepository.findByNameSearch(String(machine));

    if (!machines) {
      throw new AppError('This machine does not exist', 404);
    }

    return response.json(machines);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { type } = request.body;

    const idParsed = parseInt(id);
    const updateMslMachines = container.resolve(UpdateMslMachinesService);

    const machines = await updateMslMachines.execute({
      id: idParsed,
      type,
    });

    return response.status(201).json(machines);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteMslMachines = container.resolve(DeleteMslMachinesService);

    await deleteMslMachines.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const machineRepository = new MslMachinesRepository();

    const allMachines = await machineRepository.findallMachinesNotPaginate();

    return response.status(200).json(allMachines);
  }

  public async validate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { machine } = request.query;

    const machineRepository = new MslMachinesRepository();

    const machines = await machineRepository.findByMachine(String(machine));

    if (!machines) {
      throw new AppError('Máquina não encontrada', 404);
    }

    return response.json(machines);
  }
}
