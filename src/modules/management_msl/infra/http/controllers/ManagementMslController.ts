import ICreateManagementMslDTO from '@modules/management_msl/dtos/ICreateManagementMslDTO';
import { IUpdateManagementMslDTO } from '@modules/management_msl/dtos/IUpdateManagementMslDTO';
import CreateManagementMslService from '@modules/management_msl/services/CreateManagementMslService';
import DeleteManagementMslService from '@modules/management_msl/services/DeleteManagementMslService';
import FilterAllManagementMslService from '@modules/management_msl/services/FilterAllManagementMslService';
import FilterPaginateManagementMslService from '@modules/management_msl/services/FilterPaginateManagementMslService';
import ImportManagementMslService from '@modules/management_msl/services/ImportManagementMslService';
import UpdateManagementMslService from '@modules/management_msl/services/UpdateManagementMslService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ManagementMslRepository from '../../typeorm/repositories/ManagementMslRepository';

export default class ManagementMslController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { component, description, id_level_msl, fn_factory } =
      request.body as ICreateManagementMslDTO;

    const { id: id_employee } = request.user;

    const createManagementMsl = container.resolve(CreateManagementMslService);

    const managementMsl = await createManagementMsl.execute({
      component,
      description,
      id_level_msl,
      id_employee,
      fn_factory
    });

    return response.status(201).json(managementMsl);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const managementMslRepository = new ManagementMslRepository();

    const { page } = request.query;

    const { managementMsl, totalPages, totalManagementMsl } =
      await managementMslRepository.findAllManagementMsl(Number(page));

    return response.status(200).json({
      managementMsl,
      totalPages,
      totalManagementMsl,
    });
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const managementMslRepository = new ManagementMslRepository();

    const managementMsl =
      await managementMslRepository.findAllManagementMslNotPaginate();

    return response.status(200).json(managementMsl);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { component } = request.query;

    const managementMslRepository = new ManagementMslRepository();

    const managementMsl = await managementMslRepository.findBySearch(
      String(component)
    );

    if (!managementMsl) {
      return response.status(404).json();
    }

    return response.status(200).json(managementMsl);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id_level_msl } = request.body as IUpdateManagementMslDTO;
    const { id: id_employee } = request.user;

    const updateManagementMsl = container.resolve(UpdateManagementMslService);

    const targetR = await updateManagementMsl.execute({
      id: Number(id),
      id_level_msl,
      id_employee,
    });

    return response.status(200).json(targetR);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteManagementMsl = container.resolve(DeleteManagementMslService);

    await deleteManagementMsl.execute(Number(id));

    return response.status(200).json();
  }

  public async filterAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { status, lines } = request.query;

    const filterAllManagementMsl = container.resolve(
      FilterAllManagementMslService
    );

    const data = await filterAllManagementMsl.execute(
      status ? String(status) : undefined,
      lines ? JSON.parse(JSON.stringify(lines)) : undefined
    );

    return response.status(200).json(data);
  }

  public async filterPaginate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { page } = request.query;

    const filterPaginateManagementMsl = container.resolve(
      FilterPaginateManagementMslService
    );

    const data = await filterPaginateManagementMsl.execute(Number(page));

    return response.status(200).json(data);
  }

  public async import(request: Request, response: Response): Promise<Response> {
    const importManagementMsl = container.resolve(
      ImportManagementMslService
    );

    const { id: id_employee } = request.user;

    const managementMsl = await importManagementMsl.execute({
      filename: request.file.filename,
      id_employee,
    });

    return response.status(201).json(managementMsl);
  }
}
