import { Request, Response } from 'express';
import { MaterialManagerRepository } from '../../typeorm/repositories/MaterialManagerRepository';

export default class DetailMaterialController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { list_code } = request.params;

    const materialRepository = new MaterialManagerRepository();

    const materials = await materialRepository.findDetailsByListCode(list_code);

    const totalComponent = await materialRepository.totalComponentSMTList(list_code);
    const totalComponentRead = await materialRepository.totalComponentSMTListRead(list_code);

    return response.status(200).json({
      materials,
      totalComponent,
      totalComponentRead
    });

  }
}
