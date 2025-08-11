import LogRefilAuthorizationMaterialManagerService from '../../typeorm/repositories/MaterialAuthorizationLogRefilRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';


export default class LogRefilAuthorizationMaterialController {

  public async show(request: Request, response: Response): Promise<Response> {
    const {dateStart, dateEnd } = request.query;

    const logRefilMaterialManagerService = new LogRefilAuthorizationMaterialManagerService();

    const logRefil = await logRefilMaterialManagerService.findRefilByLog(dateStart, dateEnd);

    if (!logRefil) {
      throw new AppError('Não existe dados', 404);
    }

    return response.status(200).json({logRefil});
  }
}

