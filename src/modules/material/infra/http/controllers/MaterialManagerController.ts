import { Request, Response } from 'express';
import CreateMaterialManagerService from '@modules/material/services/CreateMaterialManagerService';

import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { FeederRepository } from '@modules/feeder/infra/typeorm/repositories/FeederRepository';
import UploadFileMaterialManagerService from '@modules/material/services/UploadFileMaterialManager';
import { MaterialManagerRepository } from '../../typeorm/repositories/MaterialManagerRepository';
import VersionListMaterialManagerRepository from '../../typeorm/repositories/VersionListMaterialManagerRepository';
import MaterialManagerSetupRepository from '../../typeorm/repositories/MaterialManagerSetupRepository';


export default class MaterialManagerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSmtMaterialList = container.resolve(
      CreateMaterialManagerService,
    );

    const { struct_code, side_product, id_employee } = request.body;

    const material = await createSmtMaterialList.execute({
      struct_code,
      side_product,
      id_employee,
    });

    return response.status(201).json(material);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? Number(page) : 1;
    const materialRepository = new MaterialManagerRepository();

    const {
      materials,
      totalPages,
      totalMaterials,
    } = await materialRepository.listAll(p);

    const registers=[];
      // eslint-disable-next-line no-plusplus
      for(let i = 0; i < materials.length; i++){

        const code_list = materials[i].list_code;

        // eslint-disable-next-line no-await-in-loop
        const status_oven = await materialRepository.verificationStatusOven(String(code_list));


        const totalMaterial = materials[i];

        const obj={...
          totalMaterial,
          status_oven
        };
        registers.push(obj);
      }

      const materialsParse = registers.map(item => {
        return {
          ...item,
          url: item.oven_profile ? `${process.env.SERVER_URL}/statics/${item.oven_profile}` : null
        }
      })

    return response.json({
      materials:materialsParse,
      totalPages,
      totalMaterials
    });


    // return response.json({ materials: materialsParse, totalPages, totalMaterials });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { list_code } = request.query;
    const materialRepository = new MaterialManagerRepository();

    const materials = await materialRepository.findByListCodeSearch(
      String(list_code),
    );

    if (!materials) {
      throw new AppError('This Material List does not exist', 404);
    }

    const materialsParse = materials.map(item => {
      return {
        ...item,
        url: item.oven_profile ? `${process.env.SERVER_URL}/statics/${item.oven_profile}` : null
      }
    })

    return response.json({ materials: materialsParse });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { list_code } = request.params;

    const materialRepository = new MaterialManagerRepository();
    const versionListMaterialRepository = new VersionListMaterialManagerRepository();
    const materialSetupRepository = new MaterialManagerSetupRepository();
    const feederRepository = new FeederRepository();

    const feeder = await materialSetupRepository.findSetupFeeder(String(list_code))

    for (let i = 0; i < feeder.length; i++) {
      const idFeeder = feeder[i].id_feeder;

      // eslint-disable-next-line no-await-in-loop
      await feederRepository.updateStatus(idFeeder)
    }

    const verifyStatusList = await materialRepository.findByListCode(String(list_code));

    if (verifyStatusList?.status === 'online') {
      throw new AppError('Lista "Online" não pode ser excluída.', 404);
    }

    await materialRepository.delete(String(list_code));

    await versionListMaterialRepository.disableVersion(String(list_code));

    return response.status(204).json({});
  }

  public async indexFilter(request: Request, response: Response): Promise<Response> {
    const { page, product_name, status, side } = request.query;
    const p = typeof page === 'string' ? Number(page) : 1;
    const materialRepository = new MaterialManagerRepository();

    const {
      materials,
      totalPages,
      totalMaterials,
    } = await materialRepository.listAllFilter(p, String(product_name), String(status), String(side));

    const materialsParse = materials.map((item: any) => {

      return {
        ...item,
        url: item.oven_profile ? `${process.env.SERVER_URL}/statics/${item.oven_profile}` : null
      }
    })

    return response.json({ materials: materialsParse, totalPages, totalMaterials });
  }

  public async upload(request: Request, response: Response): Promise<Response> {
    const { list_code } = request.params;
    const { file } = request;

    const uploadFileMaterialManager = container.resolve(UploadFileMaterialManagerService);

    await uploadFileMaterialManager.execute({
      list_code: String(list_code),
      filename: file.filename,
    });

    return response.status(201).json()
  }
}
