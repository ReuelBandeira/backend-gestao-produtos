/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateDefectService from '@modules/defect/services/CreateDefectService';
import UpdateDefectService from '@modules/defect/services/UpdateDefectService';
import DeleteDefecteeService from '@modules/defect/services/DeleteDefectService';
import DefectsRepository from '../../typeorm/repositories/DefectRepository';

export default class DefectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description, code, type } = request.body;

    const createDefect = container.resolve(CreateDefectService);

    const codeT = code.toUpperCase();

    const workgroup = await createDefect.execute({
      description,
      code: codeT,
      type,
    });

    return response.status(201).json(workgroup);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new DefectsRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const { defect, totalPages, totalDefects } =
      await workgroupRepository.findAllDefects(p);

    return response.json({
      defect,
      totalPages,
      totalDefects,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description } = request.query;

    const defectRepository = new DefectsRepository();

    const defect = await defectRepository.findByNameSearch(String(description));

    if (!defect) {
      throw new AppError('This Defect does not exist', 404);
    }

    return response.json(defect);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description } = request.body;

    const idParsed = parseInt(id);
    const updateDefect = container.resolve(UpdateDefectService);

    const workgroup = await updateDefect.execute({
      id: idParsed,
      description,
    });

    return response.status(201).json(workgroup);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteDefect = container.resolve(DeleteDefecteeService);

    await deleteDefect.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findActions(
    request: Request,
    response: Response
  ): Promise<Response> {
    const actions = new DefectsRepository();

    const type_defrects = await actions.findAllTypeFeeder();

    return response.json({
      type_defrects,
    });
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const defectRepository = new DefectsRepository();

    const defects = await defectRepository.findAllTypeFeeder();

    return response.json({
      defects,
    });
  }
}
