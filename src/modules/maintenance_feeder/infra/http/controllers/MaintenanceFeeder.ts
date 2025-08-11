/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import CreateMaintenanceFeederActionsService from '@modules/maintenance_feeder/services/CreateMaintenanceFeederActionsService';
import CreateMaintenanceFeederService from '@modules/maintenance_feeder/services/CreateMaintenanceFeederService';
import DeleteMaintenanceFeederService from '@modules/maintenance_feeder/services/DeleteMaintenanceFeederService';
import UpdateMaintenanceFeederService from '@modules/maintenance_feeder/services/UpdateMaintenanceFeederService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {MaintenanceFeederRepository} from '../../typeorm/repositories/MaintenanceFeederRepository';

export default class MaintenanceFeederController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const tooling_controlRepository = new MaintenanceFeederRepository();

    const {
      maintenanceFeeder,
      totalPages,
      totalMaintenanceFeeder,
    } = await tooling_controlRepository.findAllProducts(p);


    const feeder_maintenace=[];
      for(let i = 0; i < maintenanceFeeder.length; i++){
        const id_maintenance=maintenanceFeeder[i].id;
        const maintenance= maintenanceFeeder[i];
        // eslint-disable-next-line no-await-in-loop
        const check_actions = await tooling_controlRepository.findActions(id_maintenance);

        const obj_maintenance={...
          maintenance,
          check_actions
        };

        feeder_maintenace.push(obj_maintenance);

      }



    return response.json({feeder_maintenace, totalPages,  totalMaintenanceFeeder});
  };



  public async show(request: Request, response: Response): Promise<Response> {
    const { id_feeders } = request.query;

    // adcionado a paginação
    const p = typeof page === 'string' ? parseInt(page):1;

    const tooling_controlRepository = new MaintenanceFeederRepository();

    const tooling_control= await tooling_controlRepository.findByProductNameSearch(
      Number(id_feeders),
      p,
    );


    return response.json(tooling_control);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id_feeders,actions,id_cause,id_defect,type_maintenance } = request.body;
    const { id: id_employee } = request.user;
    const createMaintenanceFeeder = container.resolve(CreateMaintenanceFeederService);
    const createMaintenanceFeederActions = container.resolve(CreateMaintenanceFeederActionsService);
    const updatestatusfeeder = new MaintenanceFeederRepository();

      const maintenanceFeeder = await createMaintenanceFeeder.execute({
        id_feeders,
        id_cause,
        id_defect,
        type_maintenance,
        id_employee,
      });

      const id_maintenance=maintenanceFeeder.id;

      for(let i = 0; i < actions.length; i++){
        // eslint-disable-next-line no-await-in-loop
        const maintenanceFeederActions = await createMaintenanceFeederActions.execute({
          id_maintenance_feeder:id_maintenance,
          id_action:(actions[i].id_action),
          id_employee
        });
      }

      updatestatusfeeder.updateStatusFeeder(id_feeders);

    return response.status(201).json(maintenanceFeeder);
  }

  public async create_maintenance_actions(request: Request, response: Response): Promise<Response> {
    const { id_maintenance_feeder,actions} = request.body;
    const { id: id_employee } = request.user;
    const createMaintenanceFeederActions = container.resolve(CreateMaintenanceFeederActionsService);

    for(let i = 0; i < actions.length; i++){
      // eslint-disable-next-line no-await-in-loop
      const maintenanceFeederActions = await createMaintenanceFeederActions.execute({
        id_maintenance_feeder,
        id_action:(actions[i].id_action),
        id_employee
      });
    }

    return response.status(201).json();
  }


  public async update(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const {id_feeders,id_cause,id_defect,type_maintenance} = request.body;

    const update = container.resolve(UpdateMaintenanceFeederService);

    const product = await update.execute({
      id,
      id_feeders,

      id_cause,
      id_defect,
      type_maintenance,

    });

    return response.status(201).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteProducts = container.resolve(DeleteMaintenanceFeederService);

    await deleteProducts.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async indexAllFilter(request: Request, response: Response): Promise<Response> {
    const { page, id_feeders, type_maintenance } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const tooling_controlRepository = new MaintenanceFeederRepository();

    const {
      toolingControl,
      totalPages,
      totalMaintenanceFeeder,
    } = await tooling_controlRepository.findAllMaintenanceFeederFilter(
        p,
        Number(id_feeders),
        String(type_maintenance)
      );

    const tooling_controlWithouPassword = toolingControl.map((item) => {
      return { ...item, password: undefined };
    });

    const feeder_maintenace=[];
      for(let i = 0; i < tooling_controlWithouPassword.length; i++){
        const id_maintenance=tooling_controlWithouPassword[i].id;
        const maintenance= tooling_controlWithouPassword[i];
        // eslint-disable-next-line no-await-in-loop
        const check_actions = await tooling_controlRepository.findActions(id_maintenance);

        const obj_maintenance={...
          maintenance,
          check_actions
        };

        feeder_maintenace.push(obj_maintenance);

      }


    return response.json({
      maintenance_feeder: feeder_maintenace,
      totalPages,
      totalMaintenanceFeeder,
    });
  }

  public async listMaintenanceFeeder(request: Request, response: Response): Promise<Response> {
    const tooling_controlRepository = new MaintenanceFeederRepository();

    const maintenanceFeeder = await tooling_controlRepository.findAllMaintenanceFeederList();

    const feeder_maintenace=[];
      for(let i = 0; i < maintenanceFeeder.length; i++){
        const id_maintenance=maintenanceFeeder[i].id;

        const maintenance= maintenanceFeeder[i];
        // eslint-disable-next-line no-await-in-loop
        const check_actions = await tooling_controlRepository.findActions(id_maintenance);

        const obj_maintenance={...
          maintenance,
          check_actions
        };

        feeder_maintenace.push(obj_maintenance);

      }


    return response.json({
      feeder_maintenace
    });
  }

  public async dateFeeder(request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd } = request.query;

    const logRefilMaterialManagerService = new MaintenanceFeederRepository();

    const reportFeeders = await logRefilMaterialManagerService.findReportFeeder(dateStart,dateEnd);

    if (!reportFeeders) {
      throw new AppError('Não existe dados', 404);
    }

    const report_feeders=[];
      for(let i = 0; i < reportFeeders.length; i++){
        const id_maintenance=reportFeeders[i].maintenance_feeder_id;

        const report= reportFeeders[i];
        // eslint-disable-next-line no-await-in-loop
        const check_actions = await logRefilMaterialManagerService.findActions(id_maintenance);

        const obj_maintenance={...
          report,
          check_actions
        };

        report_feeders.push(obj_maintenance);

      }


    return response.status(200).json({report_feeders});
  }

  public async filterFeeder(request: Request, response: Response): Promise<Response> {
    const {id_feeders} = request.query;

    const logRefilMaterialManagerService = new MaintenanceFeederRepository();

    const reportFeeders = await logRefilMaterialManagerService.findFilterFeeder(Number(id_feeders));

    if (!reportFeeders) {
      throw new AppError('Não existe dados', 404);
    }

    const report_feeders=[];
      for(let i = 0; i < reportFeeders.length; i++){
        const id_maintenance=reportFeeders[i].maintenance_feeder_id;

        const report= reportFeeders[i];

        // eslint-disable-next-line no-await-in-loop
        const check_actions = await logRefilMaterialManagerService.findActions(id_maintenance);

        const obj_maintenance={...
          report,
          check_actions
        };

        report_feeders.push(obj_maintenance);

      }


    return response.status(200).json({report_feeders});
  }

  public async dateFeederType(request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd,type_maintenance} = request.query;

    const logRefilMaterialManagerService = new MaintenanceFeederRepository();

    const reportFeeders = await logRefilMaterialManagerService.findReportFeederType(dateStart,dateEnd,type_maintenance);

    if (!reportFeeders) {
      throw new AppError('Não existe dados', 404);
    }

    const report_feeders=[];
      for(let i = 0; i < reportFeeders.length; i++){
        const id_maintenance=reportFeeders[i].maintenance_feeder_id;


        const report= reportFeeders[i];
        // eslint-disable-next-line no-await-in-loop
        const check_actions = await logRefilMaterialManagerService.findActions(id_maintenance);

        const obj_maintenance={...
          report,
          check_actions
        };

        report_feeders.push(obj_maintenance);

      }


    return response.status(200).json({report_feeders});
  }

  public async allfilterDate(request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd,type_maintenance,id_feeders,feeder_code} = request.query;

    const logRefilMaterialManagerService = new MaintenanceFeederRepository();

    const allreportFeeders = await logRefilMaterialManagerService.filterDateTypeSn(dateStart,dateEnd,type_maintenance,id_feeders,feeder_code);

    if (!allreportFeeders) {
      throw new AppError('Não existe dados', 404);
    }


    return response.status(200).json({allreportFeeders});
  }

  public async checkFeeder(request: Request, response: Response): Promise<Response> {
    const {feeder_code} = request.query;

    const logRefilMaterialManagerService = new MaintenanceFeederRepository();

    const reportFeeders = await logRefilMaterialManagerService.feedersRegistered(String(feeder_code));

    if (!reportFeeders) {
      throw new AppError('Não existe dados', 404);
    }

    return response.status(200).json({reportFeeders});
  }



  public async filterFeeder_code(request: Request, response: Response): Promise<Response> {
    const {feeder_code} = request.query;

    const logRefilMaterialManagerService = new MaintenanceFeederRepository();

    const reportFeeders = await logRefilMaterialManagerService.filterFeederCod(String(feeder_code));

    if (!reportFeeders) {
      throw new AppError('Não existe dados', 404);
    }

    const report_feeders=[];
      for(let i = 0; i < reportFeeders.length; i++){
        const id_maintenance=reportFeeders[i].maintenance_feeder_id;

        const report= reportFeeders[i];

        // eslint-disable-next-line no-await-in-loop
        const check_actions = await logRefilMaterialManagerService.findActions(id_maintenance);

        const obj_maintenance={...
          report,
          check_actions
        };

        report_feeders.push(obj_maintenance);

      }


    return response.status(200).json({report_feeders});
  }






}
