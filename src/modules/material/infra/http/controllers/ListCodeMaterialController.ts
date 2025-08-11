import ValidationListCodeRefilMaterialManagerService from '@modules/material/services/ValidationListCodeRefilManagerService';
import ValidationListCodeSetupMaterialManagerService from '@modules/material/services/ValidationListCodeSetupMaterialManagerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MaterialManagerRepository } from '../../typeorm/repositories/MaterialManagerRepository';
export default class ListCodeMaterialController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { list_code, refil, quality, feeder, line_name,qualityLidos } = request.query;
    const { id: id_employee } = request.user;

    let totalModulo = 0;

    let totalLidos = 0;

    if (refil || quality || feeder) {
      const validationListCode = container.resolve(
        ValidationListCodeRefilMaterialManagerService,
      );

      await validationListCode.execute({
        list_code: String(list_code),
        id_employee,
        refil: String(refil),
        quality: String(quality),
        feeder: String(feeder)
      });

      if(quality){
        const materialRepository = new MaterialManagerRepository();
        const modulosLidos = await materialRepository.moduloLido(
          list_code);
        const modulosDaLista = await materialRepository.consultarModulo(
          list_code,
        );

        totalModulo = modulosDaLista.length;
        totalLidos = modulosLidos.length;
      }

      return response.status(200).json({totalModulo,totalLidos});
    }

    const validationListCode = container.resolve(
      ValidationListCodeSetupMaterialManagerService,
    );

    const result = await validationListCode.execute({
      list_code: String(list_code),
      id_employee,
      line_name: String(line_name),
    });

    return response.status(200).json(result);
  }
}
