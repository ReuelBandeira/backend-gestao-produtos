/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import OvenTemperatureRecord from '../infra/typeorm/entities/OvenTemperatureRecord';
import IOvenTemperatureRecordRepository from '../repositories/IOvenTemperatureRecordRepository';

interface IRequest {
  id: number;
  user_approver_3: number;
  observation_3: string;
  status_approver_3: string;
}

@injectable()
export default class UpdateOvenFinalizedService {
  constructor(
    @inject('OvenTemperatureRecordRepository')
    private OvenTemperatureRecordRepository: IOvenTemperatureRecordRepository,
  ) {}

  async execute({ id, user_approver_3 ,observation_3 ,status_approver_3}: IRequest): Promise<OvenTemperatureRecord> {

    const ovenTemperatureRecord = await this.OvenTemperatureRecordRepository.findById(id);

    if (!ovenTemperatureRecord) {
      throw new AppError(`Este registro de temperatura de forno: ${id} não existe`);
    }

    const status_2 = ovenTemperatureRecord.status_approver_2;

    // eslint-disable-next-line no-multi-assign
    const verification = status_2===status_approver_3;

    if (verification===true && status_approver_3 ==="approved"){

      Object.assign(ovenTemperatureRecord, {
        user_approver_3,
        date_approver_3:() => 'CURRENT_TIMESTAMP',
        observation_3,
        status_approver_3,
        status:"approved"
      });

    }else {

      Object.assign(ovenTemperatureRecord, {
      user_approver_3,
      date_approver_3:() => 'CURRENT_TIMESTAMP',
      observation_3,
      status_approver_3,
      status:"disapproved"

    });}

    await this.OvenTemperatureRecordRepository.updateApprover_2(ovenTemperatureRecord);

    return ovenTemperatureRecord;
  }
}
