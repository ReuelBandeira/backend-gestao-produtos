/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateMaintenanceHeadNozzleService from '@modules/head_nozzle/services/CreateMaintenanceHeadNozzleService';
import UpdateMaintenanceHeadNozzleService from '@modules/head_nozzle/services/UpdateMaintenanceHeadNozzleService';
import DeleteMaintenanceHeadNozzleService from '@modules/head_nozzle/services/DeleteMaintenanceHeadNozzleService';
import MaintenanceHeadNozzleRepository from '../../typeorm/repositories/MaintenanceHeadNozzleRepository';

export default class MaintenanceHeadNozzleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {id_head_nozzle,id_action,id_cause,id_defect,type_maintenance} = request.body;

    const { id: id_employee } = request.user;

    const createMaintenanceHeadNozzle = container.resolve(CreateMaintenanceHeadNozzleService);

    const MaintenanceHeadNozzle = await createMaintenanceHeadNozzle.execute({
      id_head_nozzle,id_action,id_cause,id_defect,type_maintenance,id_employee
    });


    return response.status(201).json(MaintenanceHeadNozzle);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new MaintenanceHeadNozzleRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      MaintenanceHeadNozzle,
      totalPages,
      totalMaintenanceHeadNozzle,

    } = await workgroupRepository.findAllMaintenanceHeadNozzle(
      p,
    );

    return response.json({
      MaintenanceHeadNozzle,
      totalPages,
      totalMaintenanceHeadNozzle,

    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id_head_nozzle,id_action,id_cause,id_defect,type_maintenance } = request.body;

    const { id: id_employee } = request.user;

    const idParsed = parseInt(id);
    const updateMaintenanceHeadNozzle = container.resolve(UpdateMaintenanceHeadNozzleService);

    const MaintenanceHeadNozzle = await updateMaintenanceHeadNozzle.execute({
      id: idParsed,
      id_head_nozzle,id_action,id_cause,id_defect,type_maintenance,id_employee
    });

    return response.status(201).json(MaintenanceHeadNozzle);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteMaintenanceHeadNozzle = container.resolve(DeleteMaintenanceHeadNozzleService);

    await deleteMaintenanceHeadNozzle.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findMaintenanceHeadNozzle(request: Request, response: Response): Promise<Response> {
    const MaintenanceHeadNozzle = new MaintenanceHeadNozzleRepository();

    const MaintenanceHeadNozzle_registers = await MaintenanceHeadNozzle.findAllRegisters();

    return response.json({
      MaintenanceHeadNozzle_registers

    });
  }

  public async Report(request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd} = request.query;

    const maintenanceHeadNozzle = new MaintenanceHeadNozzleRepository();

    const allreport = await maintenanceHeadNozzle.filterReport(dateStart,dateEnd);

    if (!allreport) {
      throw new AppError('Não existe dados', 404);
    }

    return response.status(200).json({allreport});
  }


}
