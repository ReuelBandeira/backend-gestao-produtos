import FamilyRecord from '@modules/family_record/infra/typeorm/entities/FamilyRecord';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IFamilyRecordRepository from '../repositories/IFamilyRecordRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteFamilyRecordService {
  constructor(
    @inject('FamilyRecordRepository')
    private FamilyRecordRepository: IFamilyRecordRepository,
  ) {}

  async execute({ id }: IRequest): Promise<FamilyRecord> {


    const FamilyRecord= await this.FamilyRecordRepository.findById(id);

    if (!FamilyRecord) {
      throw new AppError(`A ação com o id: ${id} não existe.`);
    }

    await this.FamilyRecordRepository.delete(id);

    return FamilyRecord;
  }
}
