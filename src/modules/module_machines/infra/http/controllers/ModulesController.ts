/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateModulesService from '@modules/module_machines/services/CreateModulesService';
import UpdateModulesService from '@modules/module_machines/services/UpdateModulesService';
import DeleteModulesService from '@modules/module_machines/services/DeleteModulesService';
import ModulesRepository from '../../typeorm/repositories/ModulesRepository';

export default class ModulesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {description} = request.body;

    const descriptionT = description.toUpperCase()

    const createModule = container.resolve(CreateModulesService);

    const module = await createModule.execute({
      description:descriptionT

    });

    return response.status(201).json(module);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new ModulesRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      module,
      totalPages,
      totalModules,

    } = await workgroupRepository.findAllModules(
      p,
    );

    return response.json({
      module,
      totalPages,
      totalModules,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description } = request.query;

    const moduleRepository = new ModulesRepository();

    const module = await moduleRepository.findByNameSearch(String(description));

    if (!module) {
      throw new AppError('This Type does not exist', 404);
    }

    return response.json(module);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description } = request.body;

    const idParsed = parseInt(id);
    const updateModule = container.resolve(UpdateModulesService);

    const modules = await updateModule.execute({
      id: idParsed,
      description,
    });

    return response.status(201).json(modules);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteModule = container.resolve(DeleteModulesService);

    await deleteModule.execute({ id: parsedId });

    return response.status(204).json({});
  }



  public async findModule(request: Request, response: Response): Promise<Response> {
    const module = new ModulesRepository();

    const module_machines = await module.findAllModuleRegisters();

    return response.json({
      module_machines,

    });
  }

}
