import LogSetupMaterialManagerService from '../../typeorm/repositories/MaterialManagerSetupRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';


export default class LogSetupMaterialController {

  public async show(request: Request, response: Response): Promise<Response> {
    const {dateStart, dateEnd } = request.query;

    const logSetupMaterialManagerService = new LogSetupMaterialManagerService();

    const logSetup = await logSetupMaterialManagerService.findSetupByLog(dateStart, dateEnd);

    if (!logSetup) {
      throw new AppError('Não existe dados', 404);
    }

    return response.status(200).json({logSetup});
  }
}
