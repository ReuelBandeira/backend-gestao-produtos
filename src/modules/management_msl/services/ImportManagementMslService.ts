/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import path from 'path';
import uploadConfig from '@config/upload';
import xlsx from 'xlsx';
import IManagementRepository from '@modules/levels_management_msl/repositories/IManagementRepository';
import ICreateManagementMslDTO from '../dtos/ICreateManagementMslDTO';
import IManagementMslRepository from '../repositories/IManagementMslRepository';
import ManagementMsl from '../infra/typeorm/entities/ManagementMsl';


interface IRequest {
  filename: string;
  id_employee: number;
}

// ? Esse são os campos que vem direto do excel
interface IRequestProduction {
  PartNumber: string;
  "Descrição": string;
  Msl: string;
}

@injectable()
export default class ImportManagementMslService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('ManagementMslRepository')
    private managementMslRepository: IManagementMslRepository,
    @inject('ManagementRepository')
    private managementRepository: IManagementRepository
  ) {}

  public async execute({
    filename,
    id_employee,
  }: IRequest): Promise<ICreateManagementMslDTO[]> {
    const pathFile = path.resolve(uploadConfig.tmpFolder, filename);
    const checkExtensionFile = filename.split('.');
    const validExtensions: string[] = ['xlsx', 'xls'];

    if (
      !validExtensions.includes(
        checkExtensionFile[checkExtensionFile.length - 1]
      )
    ) {
      await this.storageProvider.deleteFile(pathFile);
      throw new AppError(
        'Formato do arquivo está incorreto, formatos aceitos: .xlsx and .xls'
      );
    }

    const readExcelFile = xlsx.readFile(pathFile, {
      cellText: true,
      cellDates: true,
    });

    const getExcelFileData =
      readExcelFile.Sheets[readExcelFile.SheetNames[0]];
    const data: IRequestProduction[] =
      xlsx.utils.sheet_to_json(getExcelFileData);
    const parseData: IRequestProduction[] = JSON.parse(
      JSON.stringify(data).replace(/(?=\s+":)\s+/g, '')
    );

    const createData: ICreateManagementMslDTO[] = parseData.map(item => {
      const component = item.PartNumber.split('_')[1]
      const fn_factory = item.PartNumber.split('_')[0]

      return {
        component,
        description: item["Descrição"],
        fn_factory,
        id_employee,
        id_level_msl: Number(item.Msl)
      }
    })

    const componentsNotCreated: ICreateManagementMslDTO[] = []
    for await (const item of createData) {
      const levelMsl = await this.managementRepository.findById(item.id_level_msl);

      if (!levelMsl) {
        componentsNotCreated.push(item)
      } else {
        const checkComponentExist = await this.managementMslRepository.findBySearch(
          item.component
        );
        if (checkComponentExist.length > 0) {
          const component: ManagementMsl = {
            ...checkComponentExist[0],
            id_level_msl: item.id_level_msl,
            management: levelMsl,
            id_employee: item.id_employee,
          }
          await this.managementMslRepository.update(component);
        } else {
          await this.managementMslRepository.create(item);
        }
      }
    }

    await this.storageProvider.deleteFile(pathFile);


    return componentsNotCreated
  }
}

