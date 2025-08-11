/* eslint-disable radix */
import CreateToolgroupService from '@modules/tool_group/services/CreateToolgroupService';
import DeleteToolgroupService from '@modules/tool_group/services/DeleteToolgroupService';
import UpdateToolgroupService from '@modules/tool_group/services/UpdateToolgroupService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ToolgroupRepository from '../../typeorm/repositories/ToolgroupRepository';

export default class ToolgroupController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const toolgroupRepository = new ToolgroupRepository();

    const {
      toolgroup,
      totalPages,
      totalToolgroup,
    } = await toolgroupRepository.findAllToolgroup(p);

    return response.json({ toolgroup, totalPages,  totalToolgroup });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description_toolgroup } = request.query;

    // adcionado a paginação
    const p = typeof page === 'string' ? parseInt(page):1;

    const toolgroupRepository = new ToolgroupRepository();

    const toolgroup= await toolgroupRepository.findByToolgroupNameSearch(
      String(description_toolgroup),
      p,
    );


    return response.json(toolgroup);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { toolgroup_name,  description_toolgroup, isStencil} = request.body;

    const createToolgroupControl = container.resolve(CreateToolgroupService);

    const toolgroup_nameT=toolgroup_name.toUpperCase()

    const toolgroupControl = await createToolgroupControl

    .execute({
      toolgroup_name:toolgroup_nameT,
      description_toolgroup,
      isStencil
     });

    return response.status(201).json(toolgroupControl);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const { description_toolgroup,toolgroup_name, isStencil} = request.body;


    const idParsed = parseInt(id);
    const update = container.resolve(UpdateToolgroupService);

    const toolgroup = await update.execute({
      id:idParsed,
      toolgroup_name,
      description_toolgroup,
      isStencil
    });

    return response.status(201).json(toolgroup);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteToolgroup = container.resolve(DeleteToolgroupService);

    await deleteToolgroup.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async indexAllFilter(request: Request, response: Response): Promise<Response> {
    const { page, id, description_toolgroup } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const toolgroupRepository = new ToolgroupRepository();

    const {
      toolgroup,
      totalPages,
      totalToolgroup,
    } = await toolgroupRepository.findAllToolgroupFilter(
        p,
        Number(id),
        String(description_toolgroup)
      );

    return response.json({
      toolgroup,
      totalPages,
      totalToolgroup,
    });
  }

  public async listToolgroup(request: Request, response: Response): Promise<Response> {
    const toolgroupRepository = new ToolgroupRepository();

    const toolgroup = await toolgroupRepository.findAllToolgroupList();

    return response.json({
      toolgroup

    });
  }

  public async listToolgroupSelect(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const toolgroupRepository = new ToolgroupRepository();

    const toolgroup = await toolgroupRepository.findAllToolgroupListSelect(id);

    return response.json({
      toolgroup

    });
  }


}
