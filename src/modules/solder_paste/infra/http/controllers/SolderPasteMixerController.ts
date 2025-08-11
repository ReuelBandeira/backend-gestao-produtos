/* eslint-disable radix */
import CreateSolderPasteMixerService from '@modules/solder_paste/services/CreateSolderPasteMixerService';
// import DeleteSolderPasteMixerService from '@modules/solder_paste/services/DeleteSolderPasteMixerService';
// import UpdateSolderPasteMixerService from '@modules/solder_paste/services/UpdateSolderPasteMixerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateSolderPasteMixerService from '@modules/solder_paste/services/UpdateSolderPasteMixerService';
import DeleteSolderPasteMixerService from '@modules/solder_paste/services/DeleteSolderPasteMixerService';
import SolderPasteMixerRepository from '../../typeorm/repositories/SolderPasteMixer';


export default class SolderPasteMixerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    // eslint-disable-next-line no-shadow, no-use-before-define
    const solderPasteMixerRepository = new SolderPasteMixerRepository();

    const {
      SolderPasteMixer,
      totalPages,
      totalSolderPasteMixer,
    } = await solderPasteMixerRepository.findAllSolderPasteMixer(p);

    return response.json({ SolderPasteMixer, totalPages,  totalSolderPasteMixer });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const {serial_paste} = request.query;

    const solderPasteMixerRepository = new SolderPasteMixerRepository();

    const SolderPasteMixerSearch= await solderPasteMixerRepository.findBySerialFilter(
      String(serial_paste)
    );

    return response.json(SolderPasteMixerSearch);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {serial_paste,id_machine} = request.body;

    const { id: id_employee } = request.user;

    const createSolderPasteMixerControl = container.resolve(CreateSolderPasteMixerService);

    const SolderPasteMixerControl = await createSolderPasteMixerControl

    .execute({
      serial_paste,
      id_machine,
      id_employee_input:id_employee
    });

    return response.status(201).json(SolderPasteMixerControl);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const {serial_paste} = request.body;

    const { id: id_employee } = request.user;

    const solderPasteMixerRepository = new SolderPasteMixerRepository();

    await solderPasteMixerRepository.updateStatusMixer(
      String(serial_paste)
    );

    const update = container.resolve(UpdateSolderPasteMixerService);

    const SolderPasteMixer = await update.execute({
      serial_paste,
      id_employee_exit:id_employee
    });

    return response.status(201).json(SolderPasteMixer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteSolderPasteMixer = container.resolve(DeleteSolderPasteMixerService);

    await deleteSolderPasteMixer.execute({ id: parsedId });

    return response.status(204).json({});
  }

    public async listSolderPasteMixer(request: Request, response: Response): Promise<Response> {
    // eslint-disable-next-line no-use-before-define
    const solderPasteMixerRepository = new SolderPasteMixerRepository();

    const allSolderPasteMixer = await solderPasteMixerRepository.findAllSolderPasteMixerList();

    return response.json({
      allSolderPasteMixer
    });
  }

}
