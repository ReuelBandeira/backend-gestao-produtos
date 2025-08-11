import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import FamilyRecord from '../infra/typeorm/entities/FamilyRecord';
import IFamilyRecordRepository from '../repositories/IFamilyRecordRepository';

interface IRequest {
  description: string;
  status: string;
}

@injectable()
export default class CreateFamilyRecordService {
  constructor(
    @inject('FamilyRecordRepository')
    private FamilyRecordRepository: IFamilyRecordRepository,
  ) {}

  async execute({description,status}: IRequest): Promise<FamilyRecord> {
    const checkDescriptionExist = await this.FamilyRecordRepository.findByName(description);

    if (checkDescriptionExist) {
      throw new AppError(`Essa Familia já existe`);
    }

    // eslint-disable-next-line no-shadow
    const FamilyRecord = await this.FamilyRecordRepository.create({
      description,
      status
    });

    return FamilyRecord;
  }
}
