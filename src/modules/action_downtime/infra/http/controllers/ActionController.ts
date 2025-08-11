/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateActionService from '@modules/action_downtime/services/CreateActionService';
import UpdateActionService from '@modules/action_downtime/services/UpdateActionService';
import DeleteActionService from '@modules/action_downtime/services/DeleteActionService';
import ActionRepository from '../../typeorm/repositories/ActionDowntimeRepository';

export default class ActionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {description} = request.body;

    const createAction = container.resolve(CreateActionService);

    const workgroup = await createAction.execute({
      description
    });


    return response.status(201).json(workgroup);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new ActionRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      action,
      totalPages,
      totalAction,

    } = await workgroupRepository.findAllAction(
      p,
    );

    return response.json({
      action,
      totalPages,
      totalAction,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description } = request.query;

    const actionRepository = new ActionRepository();

    const action = await actionRepository.findByNameSearch(String(description));

    if (!action) {
      throw new AppError('This action does not exist', 404);
    }

    return response.json(action);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description } = request.body;

    const idParsed = parseInt(id);
    const updateAction = container.resolve(UpdateActionService);

    const workgroup = await updateAction.execute({
      id: idParsed,
      description,
    });

    return response.status(201).json(workgroup);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteAction = container.resolve(DeleteActionService);

    await deleteAction.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findActions(request: Request, response: Response): Promise<Response> {
    const actions = new ActionRepository();

    const actions_registers = await actions.findAllRegisters();

    return response.json({
      actions_registers,

    });
  }


}
