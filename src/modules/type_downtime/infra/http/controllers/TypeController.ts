/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateTypeService from '@modules/type_downtime/services/CreateTypeService';
import UpdateTypeService from '@modules/type_downtime/services/UpdateTypeService';
import DeleteTypeService from '@modules/type_downtime/services/DeleteTypeService';
import TypeRepository from '../../typeorm/repositories/TypeRepository';

export default class TypeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description} = request.body;

    const createType = container.resolve(CreateTypeService);

    const type = await createType.execute({
      description

    });

    return response.status(201).json(type);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new TypeRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      type,
      totalPages,
      totalType,

    } = await workgroupRepository.findAllType(
      p,
    );

    return response.json({
      type,
      totalPages,
      totalType,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description } = request.query;

    const typeRepository = new TypeRepository();

    const type = await typeRepository.findByNameSearch(String(description));

    if (!type) {
      throw new AppError('This Type does not exist', 404);
    }

    return response.json(type);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description } = request.body;

    const idParsed = parseInt(id);
    const updateType = container.resolve(UpdateTypeService);

    const workgroup = await updateType.execute({
      id: idParsed,
      description,
    });

    return response.status(201).json(workgroup);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteType = container.resolve(DeleteTypeService);

    await deleteType.execute({ id: parsedId });

    return response.status(204).json({});
  }



  public async findType(request: Request, response: Response): Promise<Response> {
    const type = new TypeRepository();

    const type_downtimes = await type.findAllTypeRegisters();

    return response.json({
      type_downtimes,

    });
  }

}
