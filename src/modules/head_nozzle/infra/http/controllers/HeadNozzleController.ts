/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateHeadNozzleService from '@modules/head_nozzle/services/CreateHeadNozzleService';
import UpdateHeadNozzleService from '@modules/head_nozzle/services/UpdateHeadNozzleService';
import DeleteHeadNozzleService from '@modules/head_nozzle/services/DeleteHeadNozzleService';
import HeadNozzleRepository from '../../typeorm/repositories/HeadNozzleRepository';

export default class HeadNozzleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {id_model,serial_number} = request.body;

    const createHeadNozzle = container.resolve(CreateHeadNozzleService);

    const HeadNozzle = await createHeadNozzle.execute({
      id_model,serial_number
    });


    return response.status(201).json(HeadNozzle);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new HeadNozzleRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      HeadNozzle,
      totalPages,
      totalHeadNozzle,

    } = await workgroupRepository.findAllHeadNozzle(
      p,
    );

    return response.json({
      HeadNozzle,
      totalPages,
      totalHeadNozzle,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const {serial_number} = request.query;

    const headNozzleRepository = new HeadNozzleRepository();

    const HeadNozzle = await headNozzleRepository.findByNameSearch(String(serial_number));

    if (!HeadNozzle) {
      throw new AppError('This HeadNozzle does not exist', 404);
    }

    return response.json(HeadNozzle);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id_model,serial_number } = request.body;

    const idParsed = parseInt(id);
    const updateHeadNozzle = container.resolve(UpdateHeadNozzleService);

    const HeadNozzle = await updateHeadNozzle.execute({
      id: idParsed,
      id_model,
      serial_number
    });

    return response.status(201).json(HeadNozzle);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteHeadNozzle = container.resolve(DeleteHeadNozzleService);

    await deleteHeadNozzle.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findHeadNozzle(request: Request, response: Response): Promise<Response> {
    const HeadNozzle = new HeadNozzleRepository();

    const HeadNozzle_registers = await HeadNozzle.findAllRegisters();

    return response.json({
      HeadNozzle_registers

    });
  }

  public async validation(request: Request, response: Response): Promise<Response> {

    const {serial_number} = request.query;

    const HeadNozzle = new HeadNozzleRepository();

    const HeadNozzle_validation = await HeadNozzle.ValidationSerialNumber(String(serial_number));

    if (HeadNozzle_validation.length===0) {
      throw new AppError('Serial não encontrado!', 404);
    }

    return response.json({
      HeadNozzle_validation
    });
  }


}
