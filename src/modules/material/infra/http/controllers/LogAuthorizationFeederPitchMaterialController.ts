import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';
import LogAuthorizationFeederPitchMaterialManagerService from '../../typeorm/repositories/MaterialAuthorizationLogFeederPitchRepository';


export default class LogAuthorizationFeederPitchMaterialController {

  public async show(request: Request, response: Response): Promise<Response> {
    const {dateStart, dateEnd } = request.query;

    const logChangeFeederMaterialManagerService = new LogAuthorizationFeederPitchMaterialManagerService();

    const logChangeFeeder = await logChangeFeederMaterialManagerService.findChangeFeederByLog(dateStart, dateEnd);

    if (!logChangeFeeder) {
      throw new AppError('Não existe dados', 404);
    }

    return response.status(200).json({logChangeFeeder});
  }
}
