/* eslint-disable radix */
import CreateQualityRegisterManagerService from '@modules/material/services/CreateQualityRegisterManagerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import splitQrCode from '@shared/util/splitQrCode';

export default class QualityMaterialManagerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { list_code, module: moduleMaterial, component } = request.body;
    const { id: id_employee } = request.user;

    let componentFormatted = '';
    const arrayQrCode =  splitQrCode.splitMulti(component, [';', '#', 'ç', '-'])

    if(arrayQrCode[0].length === 1) {
      componentFormatted = component;
    }else if(arrayQrCode[0].length <= 7) {
      componentFormatted = arrayQrCode[0].concat('-',arrayQrCode[1]);
    }else{
        // eslint-disable-next-line prefer-destructuring
        componentFormatted = arrayQrCode[0];
    }
    const sequential = arrayQrCode[arrayQrCode.length - 1];

    const createQualityRegister = container.resolve(
      CreateQualityRegisterManagerService,
    );

    const result = await createQualityRegister.execute({
      list_code,
      moduleMaterial,
      component: componentFormatted,
      id_employee,
      qr_code_information: component,
    });


    return response.status(201).json(result);
  }
}
