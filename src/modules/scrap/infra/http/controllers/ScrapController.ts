import ICreateScrapDTO from '@modules/scrap/dtos/ICreateScrapDTO';
import CreateScrapService from '@modules/scrap/services/CreateScrapService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import FindAllScrapsPaginateService from '@modules/scrap/services/FindAllScrapsPaginateService';
import FindAllScrapsService from '@modules/scrap/services/FindAllScrapsService';

export default class ScrapController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateScrapDTO;
    const { id: id_employee } = request.user;

    const createScrap = container.resolve(CreateScrapService);

    const scrap = await createScrap.execute({
      ...data,
      id_employee,
    });

    return response.status(201).json(scrap);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { page, list_code, serial_number, start_date, end_date } =
      request.query;

    const findAllScrapsPaginate = container.resolve(
      FindAllScrapsPaginateService
    );

    const scraps = await findAllScrapsPaginate.execute({
      page: Number(page),
      list_code: String(list_code) || undefined,
      serial_number: String(serial_number) || undefined,
      start_date: start_date ? parseISO(String(start_date)) : undefined,
      end_date: end_date ? parseISO(String(end_date)) : undefined,
    });

    return response.status(200).json(scraps);
  }

  async all(request: Request, response: Response): Promise<Response> {
    const { list_code, serial_number, start_date, end_date } = request.query;

    const findAllScraps = container.resolve(FindAllScrapsService);

    const scraps = await findAllScraps.execute({
      list_code: String(list_code) || undefined,
      serial_number: String(serial_number) || undefined,
      start_date: start_date ? parseISO(String(start_date)) : undefined,
      end_date: end_date ? parseISO(String(end_date)) : undefined,
    });

    return response.status(200).json(scraps);
  }
}
