/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateWorkgroupService from '@modules/workgroups/services/CreateWorkgroupService';
import UpdateWorkgroupService from '@modules/workgroups/services/UpdateWorkgroupService';
import DeleteWorkgroupeeService from '@modules/workgroups/services/DeleteWorkgroupService';
import WorkgroupsRepository from '../../typeorm/repositories/WorkgroupsRepository';

export default class WorkgroupsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createWorkgroup = container.resolve(CreateWorkgroupService);

    const workgroup = await createWorkgroup.execute({
      name,
    });

    return response.status(201).json(workgroup);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new WorkgroupsRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const { workgroups, totalPages, totalWorkgroups } =
      await workgroupRepository.findAllWorkgroups(p);

    return response.json({
      workgroups,
      totalPages,
      totalWorkgroups,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const workgroupRepository = new WorkgroupsRepository();

    const workgroups = await workgroupRepository.findByNameSearch(String(name));

    if (!workgroups) {
      throw new AppError('This Workgroup does not exist', 404);
    }

    return response.json(workgroups);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, qtd_workstation } = request.body;

    const idParsed = parseInt(id);
    const updateWorkgroup = container.resolve(UpdateWorkgroupService);

    const workgroup = await updateWorkgroup.execute({
      id: idParsed,
      name,
      qtd_workstation,
    });

    return response.status(200).json(workgroup);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteWorkgroup = container.resolve(DeleteWorkgroupeeService);

    await deleteWorkgroup.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async listWorkGroups(
    request: Request,
    response: Response
  ): Promise<Response> {
    const workgroupRepository = new WorkgroupsRepository();

    const workgroup = await workgroupRepository.findAllWorkGroupsList();

    return response.json({
      workgroup,
    });
  }
}
