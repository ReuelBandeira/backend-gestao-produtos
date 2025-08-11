/* eslint-disable radix */
import ValidationPositionSetupMaterialManagerService from '@modules/material/services/ValidationPositionSetupMaterialManagerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PositionMaterialController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { list_code, module: moduleMaterial, position, feeder, refil, quality } = request.query;
    const { id: id_employee } = request.user;

    const positionParsed =
      typeof position === 'string' ? parseInt(position) : 0;

    const validationPosition = container.resolve(
      ValidationPositionSetupMaterialManagerService,
    );

    const result = await validationPosition.execute({
      list_code: String(list_code),
      moduleMaterial: String(moduleMaterial),
      position: positionParsed,
      id_employee,
      feeder: String(feeder),
      refil: String(refil),
      quality: String(quality)
    });

    return response.status(200).json(result);
  }
}
