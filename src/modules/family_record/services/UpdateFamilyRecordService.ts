/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import FamilyRecord from '../infra/typeorm/entities/FamilyRecord';
import IFamilyRecordRepository from '../repositories/IFamilyRecordRepository';

interface IRequest {
  id: number;
  description: string;
  status: string;
}

@injectable()
export default class UpdateFamilyRecordService {
  constructor(
    @inject('FamilyRecordRepository')
    private FamilyRecordRepository: IFamilyRecordRepository,
  ) {}

  async execute({ id, description,status}: IRequest): Promise<FamilyRecord> {
    // eslint-disable-next-line no-shadow
    const FamilyRecord = await this.FamilyRecordRepository.findById(id);


    if (!FamilyRecord) {
      throw new AppError(`Está familia: ${description} não existe`);
    }


    Object.assign(FamilyRecord, {
      description,
      status
    });

    await this.FamilyRecordRepository.update(FamilyRecord);

    return FamilyRecord;
  }
}
