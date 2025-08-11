/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateOvenService from '@modules/oven/services/CreateOvenService';
import UpdateOvenService from '@modules/oven/services/UpdateOvenService';
import DeleteOvenService from '@modules/oven/services/DeleteOvenService';
import OvenRepository from '../../typeorm/repositories/OvenRepository';

export default class OvenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {oven_code,description,type_oven,qty_zones,qty_pressure} = request.body;

    const { id: id_employee } = request.user;

    const createOven = container.resolve(CreateOvenService);

    const Oven = await createOven.execute({
      oven_code,description,type_oven,qty_zones,qty_pressure,id_employee
    });


    return response.status(201).json(Oven);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const ovenRepository = new OvenRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      Oven,
      totalPages,
      totalOven,

    } = await ovenRepository.findAllOven(
      p,
    );

    return response.json({
      Oven,
      totalPages,
      totalOven,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { description } = request.query;

    const ovenRepository = new OvenRepository();

    const Oven = await ovenRepository.findByNameSearch(String(description));

    if (!Oven) {
      throw new AppError('This Oven does not exist', 404);
    }

    return response.json(Oven);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {oven_code,description,type_oven,qty_zones,qty_pressure} = request.body;

    const { id: id_employee } = request.user;


    const idParsed = parseInt(id);
    const updateOven = container.resolve(UpdateOvenService);

    const Oven = await updateOven.execute({
      id: idParsed,
      oven_code,description,type_oven,qty_zones,qty_pressure,id_employee
    });

    return response.status(201).json(Oven);
  }

  public async delete(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteOven = container.resolve(DeleteOvenService);

    await deleteOven.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findOven(request: Request, response: Response): Promise<Response> {

    const Oven = new OvenRepository();

    const oven_registers = await Oven.findAllRegisters();

    return response.json({
      oven_registers

    });
  }


}
