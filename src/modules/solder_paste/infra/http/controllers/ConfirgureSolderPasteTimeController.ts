/* eslint-disable radix */
import CreateSolderPasteTimeService from '@modules/solder_paste/services/CreateSolderPasteTimeService';
import DeleteSolderPasteTimeService from '@modules/solder_paste/services/DeleteSolderPasteTimeService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SolderPasteTimeRepository from '../../typeorm/repositories/SolderPasteTimeRepository';

export default class ConfirgureSolderPasteTimeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const solderPasteTimeRepository = new SolderPasteTimeRepository();

    const solderPasteTime = await solderPasteTimeRepository.findAllSolderPasteTime();

    const report_solderPasteControll=[];
      for(let i = 0; i < solderPasteTime.length; i++){
        const id=solderPasteTime[i].id_provider;

        const id_user=solderPasteTime[i].id_employee;

        const report= solderPasteTime[i];

        // eslint-disable-next-line no-await-in-loop
        const employes= await solderPasteTimeRepository.employee_name(id_user);

        const provider= await solderPasteTimeRepository.provider_name(id);

        let obj_provider={...
          report,
          provider,
          employes
        };

        report_solderPasteControll.push(obj_provider);

      }

    return response.json({ solderPasteTime:report_solderPasteControll });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      thaw_time,
      time_use_with_lid_closed,
      time_use_with_lid_open,
      type_paste,
      id_provider
    } = request.body;

    const { id: id_employee } = request.user;

    const createSolderPasteTimeControll = container.resolve(CreateSolderPasteTimeService);

    const providerControl = await createSolderPasteTimeControll.execute({
      thaw_time,
      time_use_with_lid_closed,
      time_use_with_lid_open,
      type_paste,
      id_employee,
      id_provider
    });

    return response.status(201).json(providerControl);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);

    const solderPasteTimeRepository = new SolderPasteTimeRepository();

    const id_provider= await solderPasteTimeRepository.id_provider_time(id);


    const provider_id =id_provider[0].id_provider


    const check_time_provider= await solderPasteTimeRepository.checkDeleteTimeProvider(provider_id);




    if (check_time_provider?.length !== 0) {
      throw new AppError(`Este cadastro de tempo não pode ser excluido pois o fornecedor possui pasta(s) de solda ativa(s). Favor, verificar!`);
    }

    const deleteSolderPasteTime = container.resolve(DeleteSolderPasteTimeService);

    await deleteSolderPasteTime.execute({ id: parsedId });

    return response.status(204).json({});
  }

}
