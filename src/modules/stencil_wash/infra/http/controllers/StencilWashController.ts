import ICreateStencilWashDTO from '@modules/stencil_wash/dtos/ICreateStencilWashDTO';
import CreateStencilWashService from '@modules/stencil_wash/services/CreateStencilWashService';
import FindAllStencilWashesPaginateService from '@modules/stencil_wash/services/FindAllStencilWashesPaginateService';
import FindAllStencilWashesService from '@modules/stencil_wash/services/FindAllStencilWashesService';

import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class StencilWashController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateStencilWashDTO;
    const { id: id_employee } = request.user;

    const createStencilWash = container.resolve(CreateStencilWashService);

    const scrap = await createStencilWash.execute({
      ...data,
      id_employee,
    });

    return response.status(201).json(scrap);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { page, id_tooling_control, id_machine, start_date, end_date } =
      request.query;

    const findAllStencilWashesPaginate = container.resolve(
      FindAllStencilWashesPaginateService
    );

    const stencilWashes = await findAllStencilWashesPaginate.execute({
      page: Number(page),
      id_tooling_control: Number(id_tooling_control) || undefined,
      id_machine: Number(id_machine) || undefined,
      start_date: start_date ? parseISO(String(start_date)) : undefined,
      end_date: end_date ? parseISO(String(end_date)) : undefined,
    });

    return response.status(200).json(stencilWashes);
  }

  async all(request: Request, response: Response): Promise<Response> {
    const { id_tooling_control, id_machine, start_date, end_date } =
      request.query;

    const findAllStencilWashes = container.resolve(FindAllStencilWashesService);

    const stencilWashes = await findAllStencilWashes.execute({
      id_tooling_control: Number(id_tooling_control) || undefined,
      id_machine: Number(id_machine) || undefined,
      start_date: start_date ? parseISO(String(start_date)) : undefined,
      end_date: end_date ? parseISO(String(end_date)) : undefined,
    });

    return response.status(200).json(stencilWashes);
  }
}
