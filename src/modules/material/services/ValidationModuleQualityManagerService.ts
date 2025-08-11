/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IQualityHeadManagerRepository from '../repositories/IQualityHeadManagerRepository';
import IMaterialManagerLogQualityRepository from '../repositories/IMaterialManagerLogQualityRepository';
import IMaterialManagerLogRefilRepository from '../repositories/IMaterialManagerLogRefilRepository';
import IMaterialManagerLogFeederRespository from '../repositories/IMaterialManagerLogFeederRespository'

interface IRequest {
  list_code: string;
  moduleMaterial: string;
  id_employee: number;
  qualitys: string;
  module: string;
}
interface IResponse {
  totalPosition: number;
  totalPositionRead: number;
}

@injectable()
export default class ValidationModuleQualityManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('QualityHeadManagerRepository')
    private qualityHeadRepository: IQualityHeadManagerRepository,
    @inject('MaterialManagerLogQualityRepository')
    private materialLogQualityRepository: IMaterialManagerLogQualityRepository,
    @inject('MaterialManagerLogRefilRepository')
    private materialLogRefilRepository: IMaterialManagerLogRefilRepository,
    @inject('MaterialManagerLogFeederRepository')
    private materialLogFeederRepository: IMaterialManagerLogFeederRespository,
  ) {}

  public async execute({
    list_code,
    moduleMaterial,
    id_employee,
    qualitys,
  }: IRequest): Promise<IResponse> {
    const materialList = await this.materialRepository.findDetailsByListCode(
      list_code,
    );

    if (!materialList || materialList.length === 0) {
      throw new AppError('Esta lista não existe', 404);
    }

    const [machineCode, moduleM, side] = moduleMaterial.split('-');

    const sideParsed = parseInt(side);

    const existsModule = !!materialList.find(
      (material) =>
        material.machine === machineCode &&
        material.module === moduleM &&
        material.side === sideParsed,
    );

    if (!existsModule) {
      const t = {
        component: '',
        id_employee,
        list_code,
        machine : '',
        module: moduleMaterial,
        position : 0,
        side : 0,
        status: 'Este módulo não existe na lista',
        component_new: '',
        component_old: '',
        feeder_new: '',
        feeder_old: '',

    }
      // criar If para qualidade, feeder e refil

        const logErrorQuality = await this.materialLogQualityRepository.create(
          t
        );

      throw new AppError('Este módulo não existe na lista', 404);
    }


    const totalPosition = await this.materialRepository.totalComponentSMTListQuality(
      list_code,
      machineCode,
      moduleM,
      sideParsed,
    );
   /*  const totalPosition = materialList.filter(
      (material) =>
        material.machine === machineCode &&
        material.module === moduleM &&
        material.side === sideParsed,
    ); */


    const qualityHead =
      await this.qualityHeadRepository.findQualityOpenByListCode(
        list_code,
        machineCode,
        moduleM,
        sideParsed,
      );

    const totalPositionRead = qualityHead
      ? qualityHead.qualityBody.filter(
          (quality) =>
            quality.machine === machineCode &&
            quality.module === moduleM &&
            quality.side === sideParsed,
        ).length
      : 0;

    if (totalPosition === totalPositionRead) {

      const t = {
        component: '',
        id_employee,
        list_code,
        machine : '',
        module: moduleMaterial,
        position : 0,
        side : 0,
        status: 'Este módulo já foi inspecionado pela Qualidade',
        component_new: '',
        component_old: '',
        feeder_new: '',
        feeder_old: '',

    }
      // criar If para qualidade, feeder e refil


        if(qualitys.length === 1){
        const logErrorQuality = await this.materialLogQualityRepository.create(
          t
        );
      }

      throw new AppError('Este módulo já foi inspecionado pela Qualidade');
    }

    return {
      totalPosition,
      totalPositionRead,
    };
  }
}
