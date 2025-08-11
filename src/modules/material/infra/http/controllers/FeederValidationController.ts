/* eslint-disable radix */
// import ValidationFeederSetupMaterialManagerService from '@modules/material/services/ValidationFeederSetupMaterialManagerService';

// eslint-disable-next-line import/no-unresolved
import FeederValidationService from '@modules/material/services/FeederValidationService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FeederValidationController {
  public async feederValidation(request: Request, response: Response): Promise<Response> {
    const {
      list_code,
      moduleMaterial,
      position,
      feeder_code
       } = request.query;

    const validationFeeder = container.resolve(
      FeederValidationService,
    );

    const result = await validationFeeder.execute({
      list_code: String(list_code),
      moduleMaterial: String(moduleMaterial),
      position:Number(position),
      feeder_code: String(feeder_code)
    });

    return response.status(200).json(result);
  }
}
