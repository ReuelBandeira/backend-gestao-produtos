/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateFamilyRecordService from '@modules/family_record/services/CreateFamilyRecordService';
import UpdateFamilyRecordService from '@modules/family_record/services/UpdateFamilyRecordService';
import DeleteFamilyRecordService from '@modules/family_record/services/DeleteFamilyRecordService';
import FamilyRecordRepository from '../../typeorm/repositories/FamilyRecordRepository';

export default class FamilyRecordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {description,status} = request.body;

    const createFamilyRecord = container.resolve(CreateFamilyRecordService);

    const FamilyRecord = await createFamilyRecord.execute({
      description,
      status
    });


    return response.status(201).json(FamilyRecord);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new FamilyRecordRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      FamilyRecord,
      totalPages,
      totalFamilyRecord,

    } = await workgroupRepository.findAllFamilyRecord(
      p,
    );

    return response.json({
      FamilyRecord,
      totalPages,
      totalFamilyRecord,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description } = request.query;

    const familyRecordRepository = new FamilyRecordRepository();

    const FamilyRecord = await familyRecordRepository.findByNameSearch(String(description));

    if (!FamilyRecord) {
      throw new AppError('This Family Record does not exist', 404);
    }

    return response.json(FamilyRecord);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description, status } = request.body;

    const idParsed = parseInt(id);
    const updateFamilyRecord = container.resolve(UpdateFamilyRecordService);

    const FamilyRecord = await updateFamilyRecord.execute({
      id: idParsed,
      description,
      status
    });

    return response.status(201).json(FamilyRecord);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteFamilyRecord = container.resolve(DeleteFamilyRecordService);

    await deleteFamilyRecord.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findFamilyRecord(request: Request, response: Response): Promise<Response> {
    const FamilyRecord = new FamilyRecordRepository();

    const FamilyRecord_registers = await FamilyRecord.findAllRegisters();

    return response.json({
      FamilyRecord_registers

    });
  }


}
