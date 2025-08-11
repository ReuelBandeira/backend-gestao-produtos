/* eslint-disable radix */
import CreateRefilRegisterManagerService from '@modules/material/services/CreateRefilRegisterManagerService';
import RoutineFinishManagerService from '@modules/material/services/RoutineFinishManagerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import splitQrCode from '@shared/util/splitQrCode';
import CreateValidationStringComponentService from '@modules/material/services/CreateValidationStringComponentService';
import AppError from '@shared/errors/AppError';
import CreateValidationStringComponentServiceNotQty from '@modules/material/services/CreateValidationStringComponentServiceNotQty';
// import CreateValidationStringComponentServiceNew from '@modules/material/services/CreateValidationStringComponentServiceNotQty';

export default class RefilMaterialManagerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      list_code,
      module: moduleMaterial,
      position,
      component_old,
      component_new,
      component_quantity,
      feeder_pitch
    } = request.body;
    const { id: id_employee } = request.user;



    const createRefilRegister = container.resolve(
      CreateRefilRegisterManagerService,
    );

    const createValidation = container.resolve(
      CreateValidationStringComponentService
    );

    const createValidation_not_qty = container.resolve(
      CreateValidationStringComponentServiceNotQty
    );


    if (!component_quantity){
      const result_validation_Old = await createValidation.execute({
        list_code:String(list_code),
        component:String(component_old)
      });

      const result_validation_New = await createValidation.execute({
        list_code:String(list_code),
        component:String(component_new)
      });

      const result = await createRefilRegister.execute({
        list_code,
        moduleMaterial,
        position,
        component_old: result_validation_Old.componentFormatted.trim(),
        component_new: result_validation_New.componentFormatted.trim(),
        id_employee,
        sequential_old: result_validation_Old.sequential.trim(),
        qr_code_information_old: component_old,
        sequential_new: result_validation_New.sequential.trim(),
        qr_code_information_new: component_new,
        component_quantity:result_validation_New.qty_component,
        feeder_pitch
      });

      return response.status(200).json(result)
    }

    if (component_quantity){
      const result_validation_Old = await createValidation_not_qty.execute({
        list_code:String(list_code),
        component:String(component_old)
      });

      const result_validation_New = await createValidation_not_qty.execute({
        list_code:String(list_code),
        component:String(component_new)
      });

      const result = await createRefilRegister.execute({
        list_code,
        moduleMaterial,
        position,
        component_old: result_validation_Old.componentFormatted.trim(),
        component_new: result_validation_New.componentFormatted.trim(),
        id_employee,
        sequential_old: result_validation_Old.sequential.trim(),
        qr_code_information_old: component_old,
        sequential_new:result_validation_New.sequential.trim(),
        qr_code_information_new: component_new,
        component_quantity,
        feeder_pitch
      });


      return response.status(200).json(result)
    }

  }

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
}
