/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import OvenTemperatureRecord from '../infra/typeorm/entities/OvenTemperatureRecord';
import IOvenTemperatureRecordRepository from '../repositories/IOvenTemperatureRecordRepository';

interface IRequest {
  id: number;
  user_approver_2: number;
  observation_2: string;
  status_approver_2: string;
}

@injectable()
export default class UpdateOvenTemperatureRecordService {
  constructor(
    @inject('OvenTemperatureRecordRepository')
    private OvenTemperatureRecordRepository: IOvenTemperatureRecordRepository,
  ) {}

  async execute({ id, user_approver_2 ,observation_2,status_approver_2}: IRequest): Promise<OvenTemperatureRecord> {

    const ovenTemperatureRecord = await this.OvenTemperatureRecordRepository.findById(id);


    if (!ovenTemperatureRecord) {
      throw new AppError(`Este registro de temperatura de forno: ${id} não existe`);
    }

    Object.assign(ovenTemperatureRecord, {
      user_approver_2,
      observation_2,
      status_approver_2,
      date_approver_2:() => 'CURRENT_TIMESTAMP'
    });

    await this.OvenTemperatureRecordRepository.updateApprover_1(ovenTemperatureRecord);

    return ovenTemperatureRecord;
  }
}
