import { Request, Response } from 'express';

import { container } from 'tsyringe';
import FeederPitchUpdateMaterialService from '@modules/material/services/FeederPitchUpdateMaterialService';
import ValidationPitchMaterialManagerService from '@modules/material/services/ValidationPitchMaterialManagerService';


export default class FeederPitchMaterialController {
  public async update(request: Request, response: Response): Promise<Response> {
    const disable = container.resolve(FeederPitchUpdateMaterialService);

    const { id, feederPitch } = request.query;
    const idParsed = Number(id);
    const feeder_pitch = Number(feederPitch);

    const material = await disable.execute({ id: idParsed, feederPitch: feeder_pitch});

    return response.status(200).json(material);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { list_code, module, position } = request.query;

    const validationPitch = container.resolve(
      ValidationPitchMaterialManagerService,
    );

    const result = await validationPitch.execute({
      list_code: String(list_code),
      moduleMaterial: String(module),
      position: Number(position),
    });

    return response.status(200).json(result);
  }

}
