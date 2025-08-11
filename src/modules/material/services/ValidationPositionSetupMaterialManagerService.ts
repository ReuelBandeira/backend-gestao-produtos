/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IMaterialManagerLogRefilRepository from '../repositories/IMaterialManagerLogRefilRepository';
import IMaterialManagerLogFeederRespository from '../repositories/IMaterialManagerLogFeederRespository'
import IMaterialManagerLogQualityRespository from '../repositories/IMaterialManagerLogQualityRepository'

interface IRequest {
  list_code: string;
  moduleMaterial: string;
  position: number;
  id_employee: number;
  feeder: string;
  refil: string;
  quality: string;
}

interface IResponse {
  id: number;
  width: string;
  status: string;
  message: string;
}

@injectable()
export default class ValidationPositionSetupMaterialManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('MaterialManagerLogRefilRepository')
    private materialLogRefilRepository: IMaterialManagerLogRefilRepository,
    @inject('MaterialManagerLogFeederRepository')
    private materialLogFeederRepository: IMaterialManagerLogFeederRespository,
    @inject('MaterialManagerLogQualityRepository')
    private materialLogQualityRepository: IMaterialManagerLogQualityRespository,
  ) {}

  public async execute({
    list_code,
    moduleMaterial,
    position,
    id_employee,
    feeder,
    refil,
    quality,
  }: IRequest): Promise<IResponse> {
    const materialList = await this.materialRepository.findDetailsByListCode(
      list_code,
    );

    if (!materialList || materialList.length === 0) {
      throw new AppError('Esta lista não existe', 404);
    }

    const [machineCode, moduleM, side] = moduleMaterial.split('-');

    const existsModule = materialList.filter(
      (material) =>
        material.machine === machineCode &&
        material.module === moduleM &&
        material.side === parseInt(side),
    );

    if (existsModule.length === 0) {
      throw new AppError('Este módulo não existe na lista', 404);
    }

    const findPosition = existsModule.find(
      (moduleItem) => moduleItem.position === position,
    );

    if (!findPosition) {
      const t = {
        component: '',
        id_employee,
        list_code,
        machine : '',
        module: moduleMaterial,
        position,
        side : 0,
        status: 'Esta posição não existe no módulo lido',
        component_new: '',
        component_old: '',
        feeder_new: '',
        feeder_old: '',

    }
      // criar If para qualidade, feeder e refil

      if(refil.length === 1){
        const logErrorRefil = await this.materialLogRefilRepository.create(
          t
        );
      }

      if(feeder.length === 1){
        const logErrorRefil = await this.materialLogFeederRepository.create(
          t
        );
      }

      throw new AppError('Esta posição não existe no módulo lido', 404);
    }

    return {
      id: findPosition?.id,
      width: findPosition?.width,
      status: 'success',
      message: 'Campo Válido',
    };
  }
}
