import ValidationModuleQualityManagerService from '@modules/material/services/ValidationModuleQualityManagerService';
import ValidationModuleSetupMaterialManagerService from '@modules/material/services/ValidationModuleSetupMaterialManagerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ModuleMaterialController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { list_code, module: moduleMaterial, quality, feeder, refil } = request.query;
    const { id: id_employee } = request.user;

    if (quality) {
      const vaidationModuleQuality = container.resolve(
        ValidationModuleQualityManagerService,
      );

      const result = await vaidationModuleQuality.execute({
        list_code: String(list_code),
        moduleMaterial: String(moduleMaterial),
        id_employee,
        qualitys: String(quality),
        module: String(moduleMaterial),
      });

      return response.status(200).json(result);
    }

      const validationModule = container.resolve(
        ValidationModuleSetupMaterialManagerService,
      );

      const result = await validationModule.execute({
        list_code: String(list_code),
        moduleMaterial: String(moduleMaterial),
        id_employee,
        qualitys: String(quality),
        feeder: String(feeder),
        refil: String(refil),
      });

      return response.status(200).json(result);
    }
}
