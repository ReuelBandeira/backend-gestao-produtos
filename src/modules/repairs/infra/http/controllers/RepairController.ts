import IFilterRepairDTO from '@modules/repairs/dtos/IFilterRepairDTO';
import { IUpdateRepairDTO } from '@modules/repairs/dtos/IUpdateRepairDTO';
import UpdateRepairService from '@modules/repairs/services/UpdateRepairService';
import AppError from '@shared/errors/AppError';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RepairRepository from '../../typeorm/repositories/RepairRepository';

export default class RepairController {
  async filter(request: Request, response: Response): Promise<Response> {
    const { id_cause, id_defect, id_line, start_date, end_date } =
      request.query as IFilterRepairDTO;

    const repairsRepository = new RepairRepository();

    const repairs = await repairsRepository.findAllRepairsByFilter({
      id_cause: Number(id_cause) || undefined,
      id_defect: Number(id_defect) || undefined,
      id_line: Number(id_line) || undefined,
      start_date: start_date ? parseISO(String(start_date)) : undefined,
      end_date: end_date ? parseISO(String(end_date)) : undefined,
    });

    const repaired = await repairsRepository.repairedByFilter({
      id_cause: Number(id_cause) || undefined,
      id_defect: Number(id_defect) || undefined,
      id_line: Number(id_line) || undefined,
      start_date: start_date ? parseISO(String(start_date)) : undefined,
      end_date: end_date ? parseISO(String(end_date)) : undefined,
    });

    return response.status(200).json({ repairs, repaired });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const repairsRepository = new RepairRepository();

    const repairsTotal = await repairsRepository.findTotalRepairs();
    const amount_repairs = repairsTotal?.length;

    const { page } = request.query;

    const { repairs, totalPages, totalRepairs } =
      await repairsRepository.findAllRepairs(Number(page));

    const registers = [];
    for (let i = 0; i < repairs.length; i++) {

      const id_lines = repairs[i].tracking.id_line;

      // eslint-disable-next-line no-await-in-loop
      const line = await repairsRepository.findLine(Number(id_lines));

      const registers_repairs = repairs[i];

      const obj_registers = {
        ...
        registers_repairs,
        line
      };
      registers.push(obj_registers);
    }

    return response.status(200).json({
      repairs: registers,
      totalPages,
      totalRepairs,
      amount_repairs

    });
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { serial_number } = request.query;

    const repairRepository = new RepairRepository();

    const repair = await repairRepository.findBySearch(String(serial_number));

    if (!repair) {
      throw new AppError('Sem resultados para a pesquisa', 404);
    }

    return response.status(200).json(repair);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      id_cause,
      id_solution,
      id_origin,
      id_repairman,
      mechanical_position_repairman,
      observation
    } = request.body as IUpdateRepairDTO;
    const { id: id_technical } = request.user;

    const updateRepair = container.resolve(UpdateRepairService);

    const repair = await updateRepair.execute({
      id: Number(id),
      id_technical,
      id_cause,
      id_solution,
      id_origin,
      id_repairman,
      mechanical_position_repairman,
      observation,
      date_repair: new Date,
    });

    return response.status(200).json(repair);
  }

  public async fetch(request: Request, response: Response): Promise<Response> {
    const { serial_number } = request.query;

    const repairRepository = new RepairRepository();

    const serial_number_exist = await repairRepository.checkIfExistSerial(String(serial_number));

    if (!serial_number_exist) {
      throw new AppError('Número de série não encontrado ou já reparado', 404);
    }

    const repair = await repairRepository.findOne(Number(serial_number_exist?.id_tracking));

    if (!repair) {
      throw new AppError('Número de série não encontrado', 404);
    }

    return response.status(200).json(repair);
  }

  public async updateDefect(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { defect_origin, module, observation_technical } = request.body

    const { id: id_employee_origin } = request.user;

    const repairRepository = new RepairRepository();

    const repair_verification = await repairRepository.findVerification(Number(id));

    if (repair_verification?.length === 0) {
      throw new AppError('Esse registro não existe', 404);
    }

    const repair = await repairRepository.originDefectUpdate(
      Number(id),
      Number(id_employee_origin),
      Number(defect_origin),
      String(module),
      String(observation_technical)
    );

    return response.status(200).json(repair);
  }


}
