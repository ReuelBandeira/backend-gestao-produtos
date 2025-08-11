/* eslint-disable radix */
// import ValidationFeederSetupMaterialManagerService from '@modules/material/services/ValidationFeederSetupMaterialManagerService';
import ValidationLineNameSetupMaterialManagerService from '@modules/material/services/ValidationLineNameSetupMaterialManagerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LineMaterialController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { line_name } = request.query;

    const validationLine = container.resolve(
      ValidationLineNameSetupMaterialManagerService,
    );

    const result = await validationLine.execute({
      line_name: String(line_name),
    });

    return response.status(200).json(result);
  }
}
