
import LogQualityMaterialManagerService from '../../typeorm/repositories/MaterialManagerLogQualityRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';


export default class LogSetupMaterialController {

  public async show(request: Request, response: Response): Promise<Response> {
    const {dateStart, dateEnd } = request.query;

    const logQualityMaterialManagerService = new LogQualityMaterialManagerService();

    const logQuality = await logQualityMaterialManagerService.findQualityByLog(dateStart, dateEnd);

    if (!logQuality) {
      throw new AppError('Não existe dados', 404);
    }

    return response.status(200).json({logQuality});
  }
}
