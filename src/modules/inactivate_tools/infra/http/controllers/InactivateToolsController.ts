/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import CreateInactivateToolsService from '@modules/inactivate_tools/services/CreateInactivateToolsService';
import UpdateInactivateToolsService from "@modules/inactivate_tools/services/UpdateInactivateToolsService";
import DeleteInactiveteToolsService from "@modules/inactivate_tools/services/DeleteInactiveteToolsService";

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import InactivateToolsRepository from '../../typeorm/repositories/InactivateToolsRepository';

export default class InactivateToolsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const tooling_controlRepository = new InactivateToolsRepository();

    const {
      inactivateTools,
      totalPages,
      totalInactivateTools,
    } = await tooling_controlRepository.findAllInactivateTools(p);

    return response.json({ inactivateTools, totalPages, totalInactivateTools });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { reason_tool_inactivation } = request.query;

    // adcionado a paginação
    const p = typeof page === 'string' ? parseInt(page) : 1;

    const inactivateToolsRepository = new InactivateToolsRepository();

    const inactivateTools = await inactivateToolsRepository.findByInactivateToolsSearch(
      String(reason_tool_inactivation), p);
    return response.json(inactivateTools);
  }


  public async create(request: Request, response: Response): Promise<Response> {
    const { id_tooling_control, reason_tool_inactivation } = request.body;
    const createInactivateTools = container.resolve(CreateInactivateToolsService);

    const inactivateTools = await createInactivateTools.execute({
      id_tooling_control,
      reason_tool_inactivation,
    });

    return response.status(201).json(inactivateTools);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id_tooling_control, reason_tool_inactivation } = request.body;
    const update = container.resolve(UpdateInactivateToolsService);
    const inactivateTools = await update.execute({
      id,
      id_tooling_control,
      reason_tool_inactivation,
    });

    return response.status(201).json(inactivateTools);
  }


  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteInactivateTools = container.resolve(DeleteInactiveteToolsService);

    await deleteInactivateTools.execute({ id: parsedId });

    return response.status(204).json({});
  }

}
