import { CreateFeederService } from '@modules/feeder/services/CreateFeederService';
import DeleteFeederService from '@modules/feeder/services/DeleteFeederService';
import UpdateFeederService from '@modules/feeder/services/UpdateFeederService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CheckSNRepository } from '../../typeorm/repositories/CheckSNRepository';

export default class FeederController {
  async create(request: Request, response: Response): Promise<Response> {
    const { serial_number,
            mo_number,
            model_name,
            id_line,
            station_name,
            in_station_time,
            id_employee,} = request.body;

    const createFeeder = container.resolve(CreateFeederService);

    const feeder = await createFeeder.execute({
      serial_number,
      mo_number,
      model_name,
      id_line,
      station_name,
      in_station_time,
      id_employee,
    });

    return response.status(201).json(feeder);
  }


}
