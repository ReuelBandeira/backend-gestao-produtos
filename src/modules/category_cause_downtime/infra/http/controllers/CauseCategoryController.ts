/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateCauseCategoryService from '@modules/category_cause_downtime/services/CreateCauseCategoryService';
import UpdateCauseCategoryService from '@modules/category_cause_downtime/services/UpdateCauseCategoryService';
import DeleteCauseCategoryService from '@modules/category_cause_downtime/services/DeleteCauseCategoryService';
import CauseCategoryRepository from '../../typeorm/repositories/CauseCategoryDowntimeRepository';

export default class CauseCategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {description} = request.body;

    const createCause = container.resolve(CreateCauseCategoryService);

    const cause_category = await createCause.execute({
      description,
    });

    return response.status(201).json(cause_category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const cause_categoryRepository = new CauseCategoryRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      cause_category,
      totalPages,
      totalCauses,

    } = await cause_categoryRepository.findAllCauses(
      p,
    );

    return response.json({
      cause_category,
      totalPages,
      totalCauses,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description } = request.query;

    const causeRepository = new CauseCategoryRepository();

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
    const updateCause = container.resolve(UpdateCauseCategoryService);

    const cause_category = await updateCause.execute({
      id: idParsed,
      description,
    });

    return response.status(201).json(cause_category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteCause = container.resolve(DeleteCauseCategoryService);

    await deleteCause.execute({ id: parsedId });

    return response.status(204).json({});
  }


  public async findAll(request: Request, response: Response): Promise<Response> {
    const cause = new CauseCategoryRepository();

    const causes_category_all = await cause.findAllRegisters();

    return response.json({
      causes_category_all ,

    });
  }

}
