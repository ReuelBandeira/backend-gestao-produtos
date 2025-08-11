/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateCauseService from '@modules/cause/services/CreateCauseService';
import UpdateCauseService from '@modules/cause/services/UpdateCauseService';
import DeleteCauseeeService from '@modules/cause/services/DeleteCauseService';
import CausesRepository from '../../typeorm/repositories/CauseRepository';

export default class CausesController {
  public async all(request: Request, response: Response): Promise<Response> {
    const causeRepository = new CausesRepository();

    const causes = await causeRepository.findAllCausesNotPaginate();

    return response.status(200).json(causes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, code, type } = request.body;

    const createCause = container.resolve(CreateCauseService);

    const codeT = code.toUpperCase();

    const workgroup = await createCause.execute({
      description,
      code: codeT,
      type,
    });

    return response.status(201).json(workgroup);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new CausesRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const { cause, totalPages, totalCauses } =
      await workgroupRepository.findAllCauses(p);

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
    const { description } = request.body;

    const idParsed = parseInt(id);
    const updateCause = container.resolve(UpdateCauseService);

    const workgroup = await updateCause.execute({
      id: idParsed,
      description,
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

  public async listWorkGroups(
    request: Request,
    response: Response
  ): Promise<Response> {
    const workgroupRepository = new CausesRepository();

    const workgroup = await workgroupRepository.findAllWorkGroupsList();

    return response.json({
      workgroup,
    });
  }

  public async findActions(
    request: Request,
    response: Response
  ): Promise<Response> {
    const cause = new CausesRepository();

    const type_causes = await cause.findAllTypeFeeder();

    return response.json({
      type_causes,
    });
  }
}
