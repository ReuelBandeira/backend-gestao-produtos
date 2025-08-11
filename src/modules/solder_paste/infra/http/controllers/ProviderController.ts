/* eslint-disable radix */
import CreateProviderService from '@modules/solder_paste/services/CreateProviderService';
import DeleteProviderService from '@modules/solder_paste/services/DeleteProviderService';
import UpdateProviderService from '@modules/solder_paste/services/UpdateProviderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProviderRepository from '../../typeorm/repositories/ProviderRepository';

export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const providerRepository = new ProviderRepository();

    const {
      provider,
      totalPages,
      totalProvider,
    } = await providerRepository.findAllProvider(p);

    return response.json({ provider, totalPages,  totalProvider });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description_provider } = request.query;

    // adcionado a paginação
    const p = typeof page === 'string' ? parseInt(page):1;

    const providerRepository = new ProviderRepository();

    const provider= await providerRepository.findByProviderNameSearch(
      String(description_provider),
      p,
    );


    return response.json(provider);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { acronym,provider_name, description_provider,type_paste,protocol,turns_on} = request.body;

    const createProviderControl = container.resolve(CreateProviderService);

    const acronymT = acronym.toUpperCase()

    const providerControl = await createProviderControl

    .execute({
      provider_name,
      description_provider,
      type_paste,
      acronym:acronymT,
      protocol,
      turns_on

    });

    return response.status(201).json(providerControl);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const { description_provider, type_paste,provider_name,acronym,protocol,turns_on} = request.body;


    const idParsed = parseInt(id);
    const update = container.resolve(UpdateProviderService);

    const provider = await update.execute({
      id:idParsed,
      provider_name,
      description_provider,
      type_paste,
      acronym,
      protocol,
      turns_on

    });

    return response.status(201).json(provider);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteProvider = container.resolve(DeleteProviderService);

    await deleteProvider.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async indexAllFilter(request: Request, response: Response): Promise<Response> {
    const { page, id, description_provider } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const providerRepository = new ProviderRepository();

    const {
      provider,
      totalPages,
      totalProvider,
    } = await providerRepository.findAllProviderFilter(
        p,
        Number(id),
        String(description_provider)
      );

    return response.json({
      provider,
      totalPages,
      totalProvider,
    });
  }

  public async listProvider(request: Request, response: Response): Promise<Response> {
    const providerRepository = new ProviderRepository();

    const provider = await providerRepository.findAllProviderList();

    return response.json({
      provider


    });
  }

  public async listProviderSelect(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const providerRepository = new ProviderRepository();

    const provider = await providerRepository.findAllProviderListSelect(id);

    return response.json({
      provider

    });
  }


}
