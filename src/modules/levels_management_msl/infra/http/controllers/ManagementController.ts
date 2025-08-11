/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateManagementService from '@modules/levels_management_msl/services/CreateManagementService';
import UpdateManagementService from '@modules/levels_management_msl/services/UpdateManagementService';
import DeleteManagementService from '@modules/levels_management_msl/services/DeleteManagementService';
import ICreateManagementDTO from '@modules/levels_management_msl/dtos/ICreateManagementDTO';
import ManagementRepository from '../../typeorm/repositories/ManagementRepository';

export default class ManagementController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { type, hours, percentage, time_baking } =
      request.body as ICreateManagementDTO;

    const createManagement = container.resolve(CreateManagementService);

    const workgroup = await createManagement.execute({
      type,
      hours,
      percentage,
      time_baking,
    });

    return response.status(201).json(workgroup);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new ManagementRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const { Management, totalPages, totalManagement } =
      await workgroupRepository.findAllManagement(p);

    return response.json({
      Management,
      totalPages,
      totalManagement,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { type } = request.query;

    const managementRepository = new ManagementRepository();

    const management = await managementRepository.findByNameSearch(
      String(type)
    );

    if (!management) {
      throw new AppError('This management does not exist', 404);
    }

    return response.json(management);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { type, hours, percentage, time_baking } =
      request.body as ICreateManagementDTO;

    const idParsed = parseInt(id);
    const updateManagement = container.resolve(UpdateManagementService);

    const management = await updateManagement.execute({
      id: idParsed,
      type,
      hours,
      percentage,
      time_baking,
    });

    return response.status(201).json(management);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteManagement = container.resolve(DeleteManagementService);

    await deleteManagement.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findManagement(
    request: Request,
    response: Response
  ): Promise<Response> {
    const management = new ManagementRepository();

    const management_registers = await management.findAllRegisters();

    return response.json({
      management_registers,
    });
  }
}
