import { getRepository, Repository } from 'typeorm';
import ILogRoutineFinishRepository from '@modules/material/repositories/ILogRoutineFinishRepository';

import ICreateLogRoutineFinishDTO from '@modules/material/dtos/ICreateLogRoutineFinishDTO';

import LogRoutineFinish from '../entities/LogRoutineFinish';
// eslint-disable-next-line import/order
import CheckToolPrinter from '@modules/check_tool_printer/infra/typeorm/entities/CheckToolPrinter';

export default class LogRoutineFinhishRepository
  implements ILogRoutineFinishRepository {
  private ormRepository: Repository<LogRoutineFinish>;

  private ormCheckToolPrinterRepository: Repository<CheckToolPrinter>;

  constructor() {
    this.ormRepository = getRepository(LogRoutineFinish);
    this.ormCheckToolPrinterRepository = getRepository(CheckToolPrinter);
  }

  public async create(
    data: ICreateLogRoutineFinishDTO,
  ): Promise<LogRoutineFinish> {
    const logRoutineFinish = await this.ormRepository.create(data);


    await this.ormRepository.save(logRoutineFinish);

    return logRoutineFinish;
  }

  async findRoutineFinishByLog(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<LogRoutineFinish[]| undefined> {
    const material = await this.ormRepository
      .createQueryBuilder('log_routine_finish')
      .leftJoinAndSelect('log_routine_finish.employee', 'employee')
      .select([
        'list_code',
        'employee.name',
        'log_routine_finish.created_at as date_time_finish'
      ])
      .where (`log_routine_finish.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}'`)
      .getRawMany();

    return material;
  }

  async findbyOPCheckToolPrinter(
    list_code: string,
  ): Promise<CheckToolPrinter[]| undefined> {
    const material = await this.ormCheckToolPrinterRepository
      .createQueryBuilder('check_tool_printer')
      .select([
        'id_production_order',
      ])
      .where ({list_code})
      .distinct(true)
      .getRawMany();

    return material;
  }
}
