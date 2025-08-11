import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ICreateShiftDTO } from '@modules/shifts/dtos/ICreateShiftDTO';
import UpdateShiftService from '@modules/shifts/services/UpdateShiftService';
import CreateShiftService from '@modules/shifts/services/CreateShiftService';
import ShiftRepository from '../../typeorm/repositories/ShiftRepository';

export default class ShiftController {
  public async index(request: Request, response: Response): Promise<Response> {
    const shiftRepository = new ShiftRepository();

    const { page } = request.query;

    const { shifts, totalPages, totalShifts } =
      await shiftRepository.findAllShiftsPaginate(Number(page));

    return response.status(200).json({
      shifts,
      totalPages,
      totalShifts,
    });
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const shiftRepository = new ShiftRepository();

    const shift = await shiftRepository.findBySearch(String(name));

    if (!shift) {
      throw new AppError('Sem resultados para a pesquisa', 404);
    }

    return response.status(200).json(shift);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, end_hour, start_hour, status } =
      request.body as ICreateShiftDTO;

    const updateShift = container.resolve(UpdateShiftService);

    const shift = await updateShift.execute({
      id: Number(id),
      name,
      end_hour,
      start_hour,
      status,
    });

    return response.status(200).json(shift);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const shiftRepository = new ShiftRepository();

    const shifts = await shiftRepository.findAllShifts();

    return response.status(200).json(shifts);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, end_hour, start_hour, status } =
      request.body as ICreateShiftDTO;

    const updateShift = container.resolve(CreateShiftService);

    const shift = await updateShift.execute({
      name,
      end_hour,
      start_hour,
      status,
    });

    return response.status(200).json(shift);
  }
}
