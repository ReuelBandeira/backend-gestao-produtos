/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { CreateSqueegeeService } from '@modules/squeegees/services/CreateSqueegeeService';
import { UpdateSqueegeeService } from '@modules/squeegees/services/UpdateSqueegeeService';
import { DeleteSqueegeeService } from '@modules/squeegees/services/DeleteSqueegeeService';
import { SqueegeeRepository } from '../../typeorm/repositories/SqueegeeRepository';

export class SqueegeeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description_squeegee, code_squeegee, usage_limit } = request.body;

    const createSqueegee = container.resolve(CreateSqueegeeService);

    const codeSqueegee = code_squeegee.toUpperCase();

    const squeegee = await createSqueegee.execute({
      description_squeegee,
      code_squeegee: codeSqueegee,
      usage_limit,
    });

    return response.status(201).json(squeegee);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const squeegeeRepository = new SqueegeeRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const { squeegee, totalPages, totalSqueegee } =
      await squeegeeRepository.findAllSqueegees(p);

    return response.json({
      squeegee,
      totalPages,
      totalSqueegee,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description_squeegee } = request.query;

    const squeegeeRepository = new SqueegeeRepository();

    const squeegee = await squeegeeRepository.findByDescriptionSqueegeeSearch(
      String(description_squeegee)
    );

    if (!squeegee) {
      throw new AppError('Esta descrição não existe!', 404);
    }

    return response.json(squeegee);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description_squeegee, usage_limit } = request.body;

    const idParsed = parseInt(id);
    const updateSqueegee = container.resolve(UpdateSqueegeeService);

    const squeegee = await updateSqueegee.execute({
      id: idParsed,
      description_squeegee,
      usage_limit,
    });

    return response.status(201).json(squeegee);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteSqueegee = container.resolve(DeleteSqueegeeService);

    await deleteSqueegee.execute({ id: parsedId });

    return response.status(204).json({});
  }
}
