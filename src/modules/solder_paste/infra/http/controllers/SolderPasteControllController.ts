/* eslint-disable no-await-in-loop */
/* eslint-disable radix */
import CreateSolderPasteControllService from '@modules/solder_paste/services/CreateSolderPasteControllService';
import UpdateSolderControllFreezerService from '@modules/solder_paste/services/UpdateSolderControllFreezerService';
import UpdateSolderControllUnFreezerService from '@modules/solder_paste/services/UpdateSolderControllUnFreezerService';
import UpdateSolderControllUseService from '@modules/solder_paste/services/UpdateSolderControllUseService';
/* import UpdateProviderService from '@modules/solder_paste/services/UpdateProviderService'; */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import moment from 'moment';
import AppError from '@shared/errors/AppError';
import SolderPasteControllRepository from '../../typeorm/repositories/SolderPasteControllRepository';
import { Any } from 'typeorm';


export default class SolderPasteControllController {

   public async indexSolderPasteControllFreezer(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const solderPasteControllRepository = new SolderPasteControllRepository();

    const {
      solderPasteControll,
      totalPages,
      totalSolderPasteControll,
    } = await solderPasteControllRepository.findAllSolderPasteControllFreezer(p);


    const report_solderPasteControll=[];
    for(let i = 0; i < solderPasteControll.length; i++){
      const id=solderPasteControll[i].id_provider;

      const report= solderPasteControll[i];

      const id_user=solderPasteControll[i].id_employee;

      const employes= await solderPasteControllRepository.employee_name(id_user);

      // eslint-disable-next-line no-await-in-loop
      const provider= await solderPasteControllRepository.provider_name(id);

      let obj_provider={...
        report,
        provider,
        employes
      };

      report_solderPasteControll.push(obj_provider);

    }

    return response.json({solderPasteControll:report_solderPasteControll, totalPages,  totalSolderPasteControll });
  }



// consulta da pasta fora do freezer
  public async indexSolderPasteControllUnFreezer(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const solderPasteControllRepository = new SolderPasteControllRepository();

    const {
      solderPasteControll,
      totalPages,
      totalSolderPasteControll,
    } = await solderPasteControllRepository.findAllSolderPasteControllUnFreezer(p);


    const report_solderPasteControll=[];
      for(let i = 0; i < solderPasteControll.length; i++){
        const id=solderPasteControll[i].id_provider;

        const report= solderPasteControll[i];

        const id_user=solderPasteControll[i].id_employee;

        const employes= await solderPasteControllRepository.employee_name(id_user);

        // eslint-disable-next-line no-await-in-loop
        const provider= await solderPasteControllRepository.provider_name(id);

        const config_paste_solder = await solderPasteControllRepository.conf_day(Number(id));

        let obj_provider={...
          report,
          provider,
          employes,
          config_paste_solder
        };

        report_solderPasteControll.push(obj_provider);

      }

    return response.json({solderPasteControllDetail:report_solderPasteControll, totalPages,  totalSolderPasteControll });

  }

  public async indexSolderPasteControllUse(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const solderPasteControllRepository = new SolderPasteControllRepository();

    const {
      solderPasteControll,
      totalPages,
      totalSolderPasteControll,
    } = await solderPasteControllRepository.findAllSolderPasteControllUse(p);


    const report_solderPasteControll=[];
      for(let i = 0; i < solderPasteControll.length; i++){
        const id=solderPasteControll[i].id_provider;

        const report= solderPasteControll[i];

        const id_user=solderPasteControll[i].id_employee;

        const employes= await solderPasteControllRepository.employee_name(id_user);

        // eslint-disable-next-line no-await-in-loop
        const provider= await solderPasteControllRepository.provider_name(id);

        let obj_provider={...
          report,
          provider,
          employes
        };

        report_solderPasteControll.push(obj_provider);

      }


    return response.json({ report_solderPasteControll, totalPages,  totalSolderPasteControll });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      serial_paste,
      datetime_freezer,
      datetime_unfreezer,
      datetime_use,
      status,
      type_paste,
    } = request.body;

    const { id: id_employee } = request.user;

    const solderPasteControl = container.resolve(CreateSolderPasteControllService);

    const providerControl = await solderPasteControl.execute({
      serial_paste,
      datetime_freezer,
      datetime_unfreezer,
      datetime_use,
      status,
      id_employee,
      type_paste,
    });

    return response.status(201).json(providerControl);
  }

  // entrada no freezer
  public async updateDateTimeFreezer(request: Request, response: Response): Promise<Response> {
    const {serial_paste} = request.params;

    const { id: id_employee } = request.user;

    const updateSolderControllFreezerService = container.resolve(UpdateSolderControllFreezerService);

    const solderPasteControll = await updateSolderControllFreezerService.execute({
      serial_paste,
      id_employee_freezer:id_employee,

    });

    return response.status(201).json(solderPasteControll);
  }


  public async updateDateTimeUnFreezer(request: Request, response: Response): Promise<Response> {
    const {serial_paste} = request.params;

    const { id: id_employee } = request.user;

    const updateSolderControllUnFreezerService = container.resolve(UpdateSolderControllUnFreezerService);

    const solderPasteControll = await updateSolderControllUnFreezerService.execute({
      serial_paste,
      id_employee_unfreezer:id_employee
    });

    return response.status(201).json(solderPasteControll);
  }

  public async updateDateTimeUse(request: Request, response: Response): Promise<Response> {
    const {serial_paste} = request.params;

    const { id: id_employee } = request.user;

    const updateSolderControllUseService = container.resolve(UpdateSolderControllUseService);

    const solderPasteControll = await updateSolderControllUseService.execute({
      serial_paste,
      id_employee_use:id_employee
    });

    return response.status(201).json(solderPasteControll);
  }

  public async findBySerialUse(request: Request, response: Response): Promise<Response> {
    const { serial_paste } = request.params;

    const solderPasteControllRepository = new SolderPasteControllRepository();

    const solderPasteControll = await solderPasteControllRepository.findBySerialUse(serial_paste);

     if (!solderPasteControll) {
      throw new AppError('Pasta não esta apta ao uso', 404);
    }

    return response.json(solderPasteControll);
  }

  // teste traz o nome do fornecedor
  public async findNameProvider(request: Request, response: Response): Promise<Response> {
    const {id} = request.query;

    const solderPasteControllRepository = new SolderPasteControllRepository();

    const solderPasteControll = await solderPasteControllRepository.provider_name(id);


    return response.json(solderPasteControll);
  }

  // teste historico da pasta de solda
  public async search_hitory_sn (request: Request, response: Response): Promise<Response> {
    const {serial_paste} = request.query;

    const solderPasteControllRepository = new SolderPasteControllRepository();

    const solderPasteControll = await solderPasteControllRepository.search_solder_paste(String(serial_paste));

    const report_solderPasteControll=[];
      for(let i = 0; i < solderPasteControll.length; i++){
        const id=solderPasteControll[i].id_provider;
        const serial=solderPasteControll[i].serial_paste;
        const id_user=solderPasteControll[i].id_employee;
        const id_user_freezer=solderPasteControll[i].id_employee_freezer;
        const id_user_unfreezer=solderPasteControll[i].id_employee_unfreezer;
        const id_user_use=solderPasteControll[i].id_employee_use;

        const report= solderPasteControll[i];

        // eslint-disable-next-line no-await-in-loop
        const employes_label_printing = await solderPasteControllRepository.employee_name(id_user);

        const employes_freezer = await solderPasteControllRepository.employee_name(id_user_freezer);

        const employes_unfreezer = await solderPasteControllRepository.employee_name(id_user_unfreezer);

        const employes_use = await solderPasteControllRepository.employee_name(id_user_use);

        const provider= await solderPasteControllRepository.provider_name(id);

        const config_paste_solder = await solderPasteControllRepository.conf_day(Number(id));

        const return_to_refrigerator = await solderPasteControllRepository.findSerialSolderPasteProvider(serial);

        const validation_refrigerator = return_to_refrigerator.length > 1 ? 'yes' : 'no';

        let obj_provider={...
          report,
          validation_refrigerator,
          provider,
          employes_label_printing,
          config_paste_solder,
          employes_freezer,
          employes_unfreezer,
          employes_use

        };

        report_solderPasteControll.push(obj_provider);

      }


    return response.json( {solderPasteControll:report_solderPasteControll});
  }

  public async history_provider_freezer(request: Request, response: Response): Promise<Response> {
    const {page ,id_provider,} = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const solderPasteControllRepository = new SolderPasteControllRepository();


    const  {
      solderPasteControll,
      totalPages,
      totalSolderPasteControll,

    } = await solderPasteControllRepository.sn_history_provider_freezer((p),Number(id_provider));

    const report_solderPasteControll=[];
      for(let i = 0; i < solderPasteControll.length; i++){
        const id=solderPasteControll[i].id_provider;

        const id_user=solderPasteControll[i].id_employee;

        const report= solderPasteControll[i];

        // eslint-disable-next-line no-await-in-loop
        const employes= await solderPasteControllRepository.employee_name(id_user);

        const provider= await solderPasteControllRepository.provider_name(id);

        let obj_provider={...
          report,
          provider,
          employes
        };

        report_solderPasteControll.push(obj_provider);

      }


    return response.json({
      report_solderPasteControll,
      totalPages,
      totalSolderPasteControll,
    });
  }

  public async history_provider_unfreezer(request: Request, response: Response): Promise<Response> {
    const {id_provider,page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;

    const solderPasteControllRepository = new SolderPasteControllRepository();

    const {
      solderPasteControll,
      totalPages,
      totalSolderPasteControll,

    } = await solderPasteControllRepository.sn_history_provider_unfreezer((p),Number(id_provider));


    const report_solderPasteControll=[];
      for(let i = 0; i < solderPasteControll.length; i++){
        const id=solderPasteControll[i].id_provider;

        const id_user=solderPasteControll[i].id_employee;

        const report= solderPasteControll[i];

        // eslint-disable-next-line no-await-in-loop
        const employes= await solderPasteControllRepository.employee_name(id_user);

        const provider= await solderPasteControllRepository.provider_name(id);

        const config_paste_solder = await solderPasteControllRepository.conf_day(Number(id));


        let obj_provider={...
          report,
          provider,
          employes,
          config_paste_solder
        };

        report_solderPasteControll.push(obj_provider);

      }

    return response.json({
      report_solderPasteControll,
      totalPages,
      totalSolderPasteControll});
  }

  public async history_provider_label_generation(request: Request, response: Response): Promise<Response> {
    const {id_provider,page} = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;

    const solderPasteControllRepository = new SolderPasteControllRepository();

    const {
      solderPasteControll,
      totalPages,
      totalSolderPasteControll,

    } = await solderPasteControllRepository.sn_history_provider_label_generation((p),Number(id_provider));

    const report_solderPasteControll=[];
      for(let i = 0; i < solderPasteControll.length; i++){
        const id=solderPasteControll[i].id_provider;

        const id_user=solderPasteControll[i].id_employee;

        const report= solderPasteControll[i];

        // eslint-disable-next-line no-await-in-loop
        const employes= await solderPasteControllRepository.employee_name(id_user);

        const provider= await solderPasteControllRepository.provider_name(id);

        let obj_provider={...
          report,
          provider,
          employes
        };

        report_solderPasteControll.push(obj_provider);

      }


      return response.json({
        report_solderPasteControll,
        totalPages,
        totalSolderPasteControll});
    }



  public async indexGeneratedLabel(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const solderPasteControllRepository = new SolderPasteControllRepository();

    const {
      solderPasteControll,
      totalPages,
      totalSolderPasteControll,
    } = await solderPasteControllRepository.generated_solder_paste_label(p);


    const report_solderPasteControll=[];
    for(let i = 0; i < solderPasteControll.length; i++){
      const id=solderPasteControll[i].id_provider;

      const report= solderPasteControll[i];

      const id_user=solderPasteControll[i].id_employee;

      const employes= await solderPasteControllRepository.employee_name(id_user);

      // eslint-disable-next-line no-await-in-loop
      const provider= await solderPasteControllRepository.provider_name(id);

      let obj_provider={...
        report,
        provider,
        employes
      };

      report_solderPasteControll.push(obj_provider);

    }

    return response.json({solderPasteControll:report_solderPasteControll, totalPages,  totalSolderPasteControll });
  }

  public async delete_paste (request: Request, response: Response): Promise<Response> {
    const {serial_paste,description_discard} = request.query;

    const { id: id_employee } = request.user;

    const id_user={ id: id_employee }

    const ids=id_user.id

    const deleteSerialPaste = new SolderPasteControllRepository();

    const validation_serial=await deleteSerialPaste.validation_serial_paste(String(serial_paste));

    if (validation_serial?.length ===0) {
      throw new AppError('Esse serial de Pasta de Solda não existe', 404);
    }

    const delete_serial=await deleteSerialPaste.delete_solder_paste(String(serial_paste),String(description_discard),Number(ids));

    return response.status(200).json({delete_serial});

  }

  public async history_soder_dates (request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd} = request.query;

    const deleteSerialPaste = new SolderPasteControllRepository();

    const history_date_filter=await deleteSerialPaste.findSolderHistoryDate(dateStart,dateEnd);

    const report_solderPasteControll=[];
    for(let i = 0; i < history_date_filter.length; i++){

      const serial=history_date_filter[i].serial_paste;

      const report= history_date_filter[i];

      const return_to_refrigerator = await deleteSerialPaste.findSerialSolderPasteProvider(serial);

      const validation_refrigerator = return_to_refrigerator.length > 1 ? 'yes' : 'no';

      const obj_result={...
        report,
        validation_refrigerator
      };
      report_solderPasteControll.push(obj_result);
    }

    return response.status(200).json({history_date_filter:report_solderPasteControll});

  }

  public async history_soder_day_filter (request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd,number_days} = request.query;

    const deleteSerialPaste = new SolderPasteControllRepository();

    // eslint-disable-next-line no-bitwise
    if (number_days == 0 | number_days?.length == 0 | number_days== undefined) {
      throw new AppError('Esse numero de dias é indefinido', 404);
    }

    const history_date_filter_day=await deleteSerialPaste.findSolderHistoryDateDays(dateStart,dateEnd);


    const list_day_filter = history_date_filter_day.filter(function(item){
      return (item.number_days == number_days);
    });

    return response.status(200).json({list_day_filter});

  }

  public async time_config (request: Request, response: Response): Promise<Response> {
    const {id_provider} = request.query;

    const deleteSerialPaste = new SolderPasteControllRepository();


    const history_date_filter_day=await deleteSerialPaste.conf_day(Number(id_provider));



    return response.status(200).json({history_date_filter_day});

  }

  public async indexUnFreezerTotal(request: Request, response: Response): Promise<Response> {

    const solderPasteControllRepository = new SolderPasteControllRepository();

    const solderPasteControll = await solderPasteControllRepository.findAllSUnFreezerTotal();


    const report_solderPasteControll=[];
      for(let i = 0; i < solderPasteControll.length; i++){
        const id=solderPasteControll[i].id_provider;

        const report= solderPasteControll[i];

        const id_user=solderPasteControll[i].id_employee;

        const employes= await solderPasteControllRepository.employee_name(id_user);

        // eslint-disable-next-line no-await-in-loop
        const provider= await solderPasteControllRepository.provider_name(id);

        const config_paste_solder = await solderPasteControllRepository.conf_day(Number(id));

        let obj_provider={...
          report,
          provider,
          employes,
          config_paste_solder
        };

        report_solderPasteControll.push(obj_provider);

      }

    return response.json({solderPasteControllDetail:report_solderPasteControll});

  }

  public async command_low_solder_paste (request: Request, response: Response): Promise<Response> {
    const {serial_paste,description_lower_freezer} = request.query;

    const { id: id_employee } = request.user;

    const id_user={ id: id_employee }

    const ids=id_user.id

    const deleteSerialPaste = new SolderPasteControllRepository();

    const validation_serial=await deleteSerialPaste.validation_serial_paste(String(serial_paste));

    if (validation_serial?.length ===0) {
      throw new AppError('Esse serial de Pasta de Solda não existe', 404);
    }

    const solder_paste_low_command=await deleteSerialPaste.low_solder_paste(String(serial_paste),String(description_lower_freezer),Number(ids));

    return response.status(200).json({solder_paste_low_command});

  }

  public async solder_paste_return_report (request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd} = request.query;

    const deleteSerialPaste = new SolderPasteControllRepository();

    const history_date_filter=await deleteSerialPaste.returnReportSolderPaste(dateStart,dateEnd);

    const report_solderPasteControll=[];
    for(let i = 0; i < history_date_filter.length; i++){

      const serial=history_date_filter[i].serial_paste;

      const report= history_date_filter[i];

      const return_to_refrigerator = await deleteSerialPaste.findSerialSolderPasteProvider(serial);

      const validation_refrigerator = return_to_refrigerator.length > 1 ? 'yes' : 'no';

      const obj_result={...
        report,
        validation_refrigerator
      };
      report_solderPasteControll.push(obj_result);
    }

    const return_report = report_solderPasteControll.filter(obj => obj.validation_refrigerator === "yes");

    return response.status(200).json({return_report_date_filter:return_report});

  }

  public async discarded_report_solder_paste (request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd} = request.query;

    const deleteSerialPaste = new SolderPasteControllRepository();

    const history_date_filter=await deleteSerialPaste.solderPasteDiscardedReport(dateStart,dateEnd);

    const report_solderPasteControll=[];
    for(let i = 0; i < history_date_filter.length; i++){

      const serial=history_date_filter[i].serial_paste;

      const report= history_date_filter[i];

      const id_user_discard= history_date_filter[i].id_employee_discard;

      const return_to_refrigerator = await deleteSerialPaste.findSerialSolderPasteProvider(serial);

      const employee_discard= await deleteSerialPaste.employee_name(id_user_discard);

      const validation_refrigerator = return_to_refrigerator.length > 1 ? 'yes' : 'no';

      const obj_result={...
        report,
        validation_refrigerator,
        employee_discard
      };
      report_solderPasteControll.push(obj_result);
    }

    return response.status(200).json({discarded_report:report_solderPasteControll});

  }

  public async low_report_solder_paste (request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd} = request.query;

    const deleteSerialPaste = new SolderPasteControllRepository();

    const history_date_filter=await deleteSerialPaste.solderPasteLowReport(dateStart,dateEnd);

    const report_solderPasteControll=[];
    for(let i = 0; i < history_date_filter.length; i++){

      const serial=history_date_filter[i].serial_paste;

      const report= history_date_filter[i];

      const return_to_refrigerator = await deleteSerialPaste.findSerialSolderPasteProvider(serial);

      const validation_refrigerator = return_to_refrigerator.length > 1 ? 'yes' : 'no';

      const obj_result={...
        report,
        validation_refrigerator,
      };
      report_solderPasteControll.push(obj_result);
    }

    return response.status(200).json({low_report:report_solderPasteControll});

  }


}
