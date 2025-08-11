/* eslint-disable radix */
import CreateSetupRegisterMaterialManagerService from '@modules/material/services/CreateSetupRegisterMaterialManagerService';
import RoutineFinishManagerService from '@modules/material/services/RoutineFinishManagerService';
import ListStatusOnlineService from '@modules/material/services/ListStatusOnlineService'
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import splitQrCode from '@shared/util/splitQrCode';
import CreateValidationStringComponentService from '@modules/material/services/CreateValidationStringComponentService';
import AppError from '@shared/errors/AppError';

export default class SetupMaterialManagerController {
  // eslint-disable-next-line consistent-return
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      list_code,
      line_name,
      module: moduleMaterial,
      position,
      feeder_code,
      component,
      component_quantity,
      feeder_pitch
    } = request.body;
    const { id: id_employee } = request.user;

    const createSetupRegister = container.resolve(
      CreateSetupRegisterMaterialManagerService,
    );

    const createValidation = container.resolve(
      CreateValidationStringComponentService
    );

    if (!component_quantity){
      const result_validation = await createValidation.execute({
        list_code:String(list_code),
        component:String(component)
      });

      const result = await createSetupRegister.execute({
        list_code,
        line_name,
        moduleMaterial,
        position,
        feeder_code,
        component: result_validation.componentFormatted.trim(),
        id_employee,
        sequential:result_validation.sequential.trim(),
        qr_code_information: component,
        component_quantity:result_validation.qty_component,
        feeder_pitch
      });

      return response.status(200).json(result);
    }

    // eslint-disable-next-line eqeqeq
    if( component_quantity !== undefined ){
      const result = await createSetupRegister.execute({
        list_code,
        line_name,
        moduleMaterial,
        position,
        feeder_code,
        component,
        id_employee,
        sequential:component.trim(),
        qr_code_information: component.trim(),
        component_quantity,
        feeder_pitch
      });
      return response.status(200).json(result)
    };
  }

  // muda status da lista
  public async update(request: Request, response: Response): Promise<Response> {
    const { list_code } = request.body;
    const { id: id_employee } = request.user;

    const routineFinish = container.resolve(RoutineFinishManagerService);

    await routineFinish.execute({
      list_code,
      id_employee,
    });

    return response.status(204).json({});
  }

  public async updateStatusListOnline(request: Request, response: Response): Promise<Response> {
    const { list_code } = request.body;
    const { id: id_employee } = request.user;

    const listStatus = container.resolve(ListStatusOnlineService);

    await listStatus.execute({
      list_code,
      id_employee,
    });

    return response.status(204).json({});
  }

  //  valida a mudança de regra da string componente
  public async validationString(request: Request, response: Response): Promise<Response> {
    const { list_code,component } = request.query;

    const validation_component = container.resolve(CreateValidationStringComponentService);

    const result = await validation_component.execute({
      list_code:String(list_code),
      component:String(component)
    });

    return response.json({
      result
    });

  }




}
