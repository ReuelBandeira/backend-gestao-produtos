/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateOvenTemperatureRecordService from '@modules/oven_temperature_record/services/CreateOvenTemperatureRecordService';
import UpdateOvenTemperatureRecordService from '@modules/oven_temperature_record/services/UpdateOvenTemperatureRecordService';
import DeleteOvenTemperatureRecordService from '@modules/oven_temperature_record/services/DeleteOvenTemperatureRecordService';
import UpdateOvenFinalizedService from '@modules/oven_temperature_record/services/UpdateOvenFinalizedService';
import OvenTemperatureRecordRepository from '../../typeorm/repositories/OvenTemperatureRecordRepository';

export default class OvenTemperatureRecordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      list_code,
      id_oven,
      pressure_1,
      pressure_2,
      pressure_3,
      pressure_4,
      speed,
      zone_1,
      zone_2,
      zone_3,
      zone_4,
      zone_5,
      zone_6,
      zone_7,
      zone_8,
      zone_9,
      zone_10,
      zone_11,
      zone_12,
      zone_13
    } = request.body;

    const { id: id_employee } = request.user;

    const createOvenTemperatureRecord = container.resolve(CreateOvenTemperatureRecordService);

    const OvenTemperatureRecord = await createOvenTemperatureRecord.execute({
      list_code,
      id_oven,
      pressure_1,
      pressure_2,
      pressure_3,
      pressure_4,
      speed,
      user_approver_1:id_employee,
      zone_1,
      zone_2,
      zone_3,
      zone_4,
      zone_5,
      zone_6,
      zone_7,
      zone_8,
      zone_9,
      zone_10,
      zone_11,
      zone_12,
      zone_13
    });


    return response.status(201).json(OvenTemperatureRecord);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new OvenTemperatureRecordRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      OvenTemperatureRecord,
      totalPages,
      totalOvenTemperatureRecord,

    } = await workgroupRepository.findAllOvenTemperatureRecord(
      p,
    );

    return response.json({
      OvenTemperatureRecord,
      totalPages,
      totalOvenTemperatureRecord,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { list_code } = request.query;

    const ovenTemperatureRecordRepository = new OvenTemperatureRecordRepository();

    const ovenTemperatureRecord = await ovenTemperatureRecordRepository.findByNameSearch(String(list_code));

    if (!ovenTemperatureRecord) {
      throw new AppError('This Oven Temperature Record does not exist', 404);
    }

    return response.json(ovenTemperatureRecord);
  }

  public async previousDetail(request: Request, response: Response): Promise<Response> {
    const {id,struct_code,id_oven} = request.query;

    const ovenTemperatureRecordRepository = new OvenTemperatureRecordRepository();

    const detail = await ovenTemperatureRecordRepository.findByDetail(Number(id),String(struct_code),Number(id_oven));

    return response.json(detail[0]);
  }

  public async updateApproverOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {observation_2,status_approver_2} = request.query;

    const { id: id_employee } = request.user;

    const idParsed = parseInt(id);
    const updateOvenTemperatureRecord = container.resolve(UpdateOvenTemperatureRecordService);

    const OvenTemperatureRecord = await updateOvenTemperatureRecord.execute({
      id: idParsed,
      user_approver_2:id_employee,
      observation_2,
      status_approver_2
    });

    return response.status(201).json(OvenTemperatureRecord);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteOvenTemperatureRecord = container.resolve(DeleteOvenTemperatureRecordService);

    await deleteOvenTemperatureRecord.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findOvenTemperatureRecord(request: Request, response: Response): Promise<Response> {

    const OvenTemperatureRecord = new OvenTemperatureRecordRepository();

    const ovenTemperatureRecord_registers = await OvenTemperatureRecord.findAllRegisters();

    return response.json({
      ovenTemperatureRecord_registers

    });
  }

  public async updateApproverTwo(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {observation_3,status_approver_3} = request.query;

    const { id: id_employee } = request.user;

    const idParsed = parseInt(id);
    const updateOvenTemperatureRecord = container.resolve(UpdateOvenFinalizedService);

    const OvenTemperatureRecord = await updateOvenTemperatureRecord.execute({
      id: idParsed,
      user_approver_3:id_employee,
      observation_3,
      status_approver_3
    });

    return response.status(201).json(OvenTemperatureRecord);
  }

  public async verificationStatus(request: Request, response: Response): Promise<Response> {

    const {list_code} = request.query;

    const ovenTemperatureRecordRepository = new OvenTemperatureRecordRepository();

    const status_verification = await ovenTemperatureRecordRepository.findByVerificationStatus(String(list_code));

    const verification=status_verification[0].status;

    return response.json({
      status:verification
    });
  }


}
