import ICreateTargetDTO from '@modules/targets/dtos/ICreateTargetDTO';
import CreateTargetService from '@modules/targets/services/CreateTargetService';
import DeleteTargetService from '@modules/targets/services/DeleteTargetService';
import UpdateTargetService from '@modules/targets/services/UpdateTargetService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import TargetRepository from '../../typeorm/repositories/TargetRepository';

export default class TargetController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {id_product,lines} = request.body;
    // validação sem repetições
    // eslint-disable-next-line func-names
    const lines_map = lines.map(function (item: { id_line: any; }) {
      return item.id_line;
    });

    const linesT = lines_map.filter(function (a) {
      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null));

    if (lines_map.length > linesT.length) {
      throw new AppError(
        `Há campos com linhas repetidas. Favor verificar!`
      );
    }

    const createTarget = container.resolve(CreateTargetService);

      for (let i = 0; i < lines.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const registers_targets = await createTarget.execute({
          id_product,
          id_line:lines[i].id_line,
          target:lines[i].target
        });
      }

    return response.status(201).json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const targetRepository = new TargetRepository();

    const { page } = request.query;

    const { targets, totalPages, totalTargets } =
      await targetRepository.findAllTargets(Number(page));

    return response.status(200).json({
      targets,
      totalPages,
      totalTargets,
    });
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const targetRepository = new TargetRepository();

    const targets = await targetRepository.findAllTargetsNotPaginate();

    return response.status(200).json(targets);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { product } = request.query;

    const targetRepository = new TargetRepository();

    const target = await targetRepository.findBySearch(String(product));

    return response.status(200).json(target);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { target } = request.body;

    const updateTarget = container.resolve(UpdateTargetService);

    const targetR = await updateTarget.execute({
      id: Number(id),
      target,
    });

    return response.status(200).json(targetR);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTarget = container.resolve(DeleteTargetService);

    await deleteTarget.execute(Number(id));

    return response.status(200).json();
  }
}
