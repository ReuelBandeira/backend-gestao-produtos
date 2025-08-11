import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ToggleDisableMaterialService from '@modules/material/services/ToggleDisableMaterialService';
import ValidationComponentOldRefilManagerService from '@modules/material/services/ValidationComponentOldRefilManagerService';
import splitQrCode from '@shared/util/splitQrCode';

export default class ComponentMaterialController {
  public async update(request: Request, response: Response): Promise<Response> {
    const disable = container.resolve(ToggleDisableMaterialService);

    const { id } = request.params;
    const idParsed = Number(id);

    const material = await disable.execute({ id: idParsed });

    return response.status(200).json(material);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { list_code, component, module: moduleMaterial, position } = request.query;
    const { id: id_employee } = request.user;

    const positionParsed =
      // eslint-disable-next-line radix
    typeof position === 'string' ? parseInt(position) : 0;

    let componentFormattedOld = ''
    const arrayQrCodeOld =  splitQrCode.splitMulti(component, [';', '#', 'ç', '-'])

    if(arrayQrCodeOld[0].length === 1) {
      componentFormattedOld = component;
    }else if(arrayQrCodeOld[0].length <= 7) {
      componentFormattedOld = arrayQrCodeOld[0].concat('-',arrayQrCodeOld[1]);
    }else{
        // eslint-disable-next-line prefer-destructuring
        componentFormattedOld = arrayQrCodeOld[0];
    }


    const validationOldComponent = container.resolve(
      ValidationComponentOldRefilManagerService,
    );

    await validationOldComponent.execute({
      list_code: String(list_code),
      component: componentFormattedOld,
      id_employee,
      position: positionParsed,
      module: String(moduleMaterial),
    });


    return response.status(204).json({});
  }
}
