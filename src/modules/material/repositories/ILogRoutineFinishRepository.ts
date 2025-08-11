import ICreateLogRoutineFinishDTO from '../dtos/ICreateLogRoutineFinishDTO';
import LogRoutineFinish from '../infra/typeorm/entities/LogRoutineFinish';

export default interface ILogRoutineFinishRepository {
  create(data: ICreateLogRoutineFinishDTO): Promise<LogRoutineFinish>;

  findRoutineFinishByLog(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<LogRoutineFinish[]| undefined>;

  findbyOPCheckToolPrinter(
    list_code: string,
  ): Promise<LogRoutineFinish[]| undefined>;
}
