import LogRoutineFinhishRepository from '../../typeorm/repositories/LogRoutineFinhishRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';


export default class LogRoutineFinishController {

  public async show(request: Request, response: Response): Promise<Response> {
    const {dateStart, dateEnd } = request.query;

    const logRoutineFinhishRepository = new LogRoutineFinhishRepository();

    const logRoutineFinish = await logRoutineFinhishRepository.findRoutineFinishByLog(dateStart, dateEnd);

    if (!logRoutineFinish) {
      throw new AppError('Não existe dados', 404);
    }

    return response.status(200).json({logRoutineFinish});
  }
}
