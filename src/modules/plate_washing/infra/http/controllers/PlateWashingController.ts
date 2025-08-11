/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreatePlateWashingService from '@modules/plate_washing/services/CreatePlateWashingService';
import UpdatePlateWashingService from '@modules/plate_washing/services/UpdatePlateWashingService';
import DeletePlateWashingService from '@modules/plate_washing/services/DeletePlateWashingService';
import PlateWashingRepository from '../../typeorm/repositories/PlateWashingRepository';

export default class PlateWashingController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {description} = request.body;

    const createPlateWashing = container.resolve(CreatePlateWashingService);

    const plateWashing = await createPlateWashing.execute({
      description
    });

    return response.status(201).json(plateWashing);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const plateWashingRepository = new PlateWashingRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      plateWashing,
      totalPages,
      totalPlateWashing,

    } = await plateWashingRepository.findAllAction(
      p,
    );

    return response.json({
      plateWashing,
      totalPages,
      totalPlateWashing,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description } = request.query;

    const plateWashingRepository = new PlateWashingRepository();

    const plateWashing = await plateWashingRepository.findByNameSearch(String(description));

    if (!plateWashing) {
      throw new AppError('This SN does not exist', 404);
    }

    return response.json(plateWashing);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description } = request.body;

    const idParsed = parseInt(id);
    const updateplateWashing = container.resolve(UpdatePlateWashingService);

    const plateWashing = await updateplateWashing.execute({
      id: idParsed,
      description,
    });

    return response.status(201).json(plateWashing);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deletePlateWashing = container.resolve(DeletePlateWashingService);

    await deletePlateWashing.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findActions(request: Request, response: Response): Promise<Response> {
    const plateWashing = new PlateWashingRepository();

    const plateWashing_registers = await plateWashing.findAllRegisters();

    return response.json({
      plateWashing_registers,

    });
  }

  public async plate_washing (request: Request, response: Response): Promise<Response> {
    const {serial_number} = request.query;

    const { id: id_employee } = request.user;

    const createPlateWashing = container.resolve(CreatePlateWashingService);

    const plateWashing = await createPlateWashing.execute({
      serial_number,
      id_employee
    });

    return response.status(201).json(plateWashing);

  }

}
