/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateCauseService from '@modules/cause_downtime/services/CreateCauseService';
import UpdateCauseService from '@modules/cause_downtime/services/UpdateCauseService';
import DeleteCauseeeService from '@modules/cause_downtime/services/DeleteCauseService';
import CausesRepository from '../../typeorm/repositories/CauseDowntimeRepository';

export default class CausesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {description,id_category_cause} = request.body;

    const createCause = container.resolve(CreateCauseService);

    const workgroup = await createCause.execute({
      description,
      id_category_cause
    });

    return response.status(201).json(workgroup);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new CausesRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      cause,
      totalPages,
      totalCauses,

    } = await workgroupRepository.findAllCauses(
      p,
    );

    return response.json({
      cause,
      totalPages,
      totalCauses,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description } = request.query;

    const causeRepository = new CausesRepository();

    const cause = await causeRepository.findByNameSearch(String(description));

    if (!cause) {
      throw new AppError('This Cause does not exist', 404);
    }

    return response.json(cause);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description,id_category_cause } = request.body;

    const idParsed = parseInt(id);
    const updateCause = container.resolve(UpdateCauseService);

    const workgroup = await updateCause.execute({
      id: idParsed,
      description,
      id_category_cause
    });

    return response.status(201).json(workgroup);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteCause = container.resolve(DeleteCauseeeService);

    await deleteCause.execute({ id: parsedId });

    return response.status(204).json({});
  }


  public async findAll(request: Request, response: Response): Promise<Response> {
    const cause = new CausesRepository();

    const type_causes = await cause.findAllRegisters();

    return response.json({
      type_causes,

    });
  }

}
