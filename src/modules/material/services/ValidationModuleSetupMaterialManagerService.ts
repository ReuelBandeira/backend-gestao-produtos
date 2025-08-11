/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IMaterialManagerLogRefilRepository from '../repositories/IMaterialManagerLogRefilRepository';
import IMaterialManagerLogFeederRespository from '../repositories/IMaterialManagerLogFeederRespository';


interface IRequest {
  list_code: string;
  moduleMaterial: string;
  id_employee: number;
  qualitys: string;
  feeder: string;
  refil: string;
}

interface IResponse {
  status: string;
  message: string;
}

@injectable()
export default class ValidationModuleSetupMaterialManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('MaterialManagerLogRefilRepository')
    private materialLogRefilRepository: IMaterialManagerLogRefilRepository,
    @inject('MaterialManagerLogFeederRepository')
    private materialLogFeederRepository: IMaterialManagerLogFeederRespository,
  ) { }

  public async execute({
    list_code,
    moduleMaterial,
    id_employee,
    feeder,
    refil,

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
        machine: '',
        module: moduleMaterial,
        position: 0,
        side: 0,
        status: 'Este módulo não existe na lista',
        component_new: '',
        component_old: '',
        feeder_new: '',
        feeder_old: '',

      }
      // criar If para qualidade, feeder e refil

      if (refil.length === 1) {
        const logErrorRefil = await this.materialLogRefilRepository.create(
          t
        );
      }


      if (feeder.length === 1) {
        const logErrorFeeder = await this.materialLogFeederRepository.create(
          t
        );
      }

      throw new AppError('Este módulo não existe na lista', 404);
    }

    return {
      status: 'success',
      message: 'Campo Válido',
    };
  }
}
