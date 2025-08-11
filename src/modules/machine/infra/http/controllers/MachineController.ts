/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateMachineService from '@modules/machine/services/CreateMachineService';
import CreateMachineUpdateOnlineService from '@modules/machine/services/CreateMachineUpdateOnlineService';

export default class MachineController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createMachine = container.resolve(CreateMachineService);
    const createMachineUpdateOnline = container.resolve(CreateMachineUpdateOnlineService);

    const { struct_bom_code, side_product, merge, update_list, list_codeAlt } = request.body;
    const { id: id_employee } = request.user;
    // var material:any[] = [];

    if(update_list === 'S'){
      const material = await createMachineUpdateOnline.execute({
        filename: request.file.filename,
        struct_bom_code,
        side_product,
        id_employee,
        merge,
        list_codeAlt
      });

      return response.status(201).json({material});


    // eslint-disable-next-line no-else-return
    }else{
      const material = await createMachine.execute({
        filename: request.file.filename,
        struct_bom_code,
        side_product,
        id_employee,
        merge,
        update_list
      });

      //  adicionado para o post da lista de material com msl

      return response.status(201).json({material});

    }

    // return response.status(201).json({material});
  }
}
