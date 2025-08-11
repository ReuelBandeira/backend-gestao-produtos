import OvenTemperatureRecord from '@modules/oven_temperature_record/infra/typeorm/entities/OvenTemperatureRecord';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOvenTemperatureRecordRepository from '../repositories/IOvenTemperatureRecordRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteOvenTemperatureRecordService {
  constructor(
    @inject('OvenTemperatureRecordRepository')
    private OvenTemperatureRecordRepository: IOvenTemperatureRecordRepository,
  ) {}

  async execute({ id }: IRequest): Promise<OvenTemperatureRecord> {

    const ovenTemperatureRecord= await this.OvenTemperatureRecordRepository.findById(id);

    if (!ovenTemperatureRecord) {
      throw new AppError(`Este registro de temperatura de forno com o id: ${id} não existe.`);
    }

    await this.OvenTemperatureRecordRepository.delete(id);

    return ovenTemperatureRecord;
  }
}
