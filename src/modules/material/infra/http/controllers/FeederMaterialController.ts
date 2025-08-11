/* eslint-disable radix */
import CreateChangeFeederRegisterManagerService from '@modules/material/services/CreateChangeFeederRegisterManagerService';
import ValidationFeederOldChangeFeederManagerService from '@modules/material/services/ValidationFeederOldChangeFeederManagerService';
import ValidationFeederSetupMaterialManagerService from '@modules/material/services/ValidationFeederSetupMaterialManagerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FeederMaterialController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { feeder_code, feeder, list_code, position, refil, quality, module: moduleMaterial } = request.query;
    const { id: id_employee } = request.user;


    if (feeder && list_code) {
      const validationOldFeeder = container.resolve(
        ValidationFeederOldChangeFeederManagerService,
      );

      const positionParsed =
        typeof position === 'string' ? parseInt(position) : -1;

      await validationOldFeeder.execute({
        feeder_code: String(feeder_code),
        list_code: String(list_code),
        position: positionParsed,
        id_employee,
        feeder_old: String(feeder_code),
        refil: String(refil),
        quality: String(quality),
        feeder: String(feeder),
        module: String(moduleMaterial),
      });

      return response.status(204).json({});
    }

    const validationFeeder = container.resolve(
      ValidationFeederSetupMaterialManagerService,
    );

    const result = await validationFeeder.execute({
      feeder_code: String(feeder_code),
    });

    return response.status(200).json(result);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      list_code,
      module: moduleMaterial,
      position,
      feeder_code_old,
      feeder_code_new,
    } = request.body;

    const { id: id_employee } = request.user;

    const createChangeFeederRegister = container.resolve(
      CreateChangeFeederRegisterManagerService,
    );

    const result = await createChangeFeederRegister.execute({
      list_code,
      moduleMaterial,
      position,
      feeder_code_old,
      feeder_code_new,
      id_employee,
      feeder_old: String(feeder_code_old),
      feeder_new: String(feeder_code_new),
    });

    return response.status(200).json(result);
  }
}
