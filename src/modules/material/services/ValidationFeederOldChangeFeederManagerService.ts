import { IFeederRepository } from '@modules/feeder/repositories/IFeederRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaterialManagerChangeFeederRepository from '../repositories/IMaterialManagerChangeFeederRepository';
import IMaterialManagerSetupRepository from '../repositories/IMaterialManagerSetupRepository';
import IMaterialManagerLogQualityRepository from '../repositories/IMaterialManagerLogQualityRepository';
import IMaterialManagerLogRefilRepository from '../repositories/IMaterialManagerLogRefilRepository';
import IMaterialManagerLogFeederRespository from '../repositories/IMaterialManagerLogFeederRespository'

interface IRequest {
  list_code: string;
  id_employee: number;
  feeder_code: string;
  feeder_old: string;
  position: number;
  refil: string;
  quality: string;
  feeder: string;
  module: string;
}

@injectable()
export default class ValidationFeederOldChangeFeederManagerService {
  constructor(
    @inject('MaterialManagerSetupRepository')
    private materialSetupRepository: IMaterialManagerSetupRepository,
    @inject('FeederRepository')
    private feederRepository: IFeederRepository,
    @inject('MaterialManagerChangeFeederRepository')
    private materialChangeFeederRepository: IMaterialManagerChangeFeederRepository,
    @inject('MaterialManagerLogQualityRepository')
    private materialLogQualityRepository: IMaterialManagerLogQualityRepository,
    @inject('MaterialManagerLogRefilRepository')
    private materialLogRefilRepository: IMaterialManagerLogRefilRepository,
    @inject('MaterialManagerLogFeederRepository')
    private materialLogFeederRepository: IMaterialManagerLogFeederRespository,
  ) { }

  public async execute({
    list_code,
    id_employee,
    feeder_code,
    position,
    refil,
    quality,
    feeder,
    module,
  }: IRequest): Promise<void> {
    const materialSetupList =
      await this.materialSetupRepository.findSetupByListCode(list_code);

    if (!materialSetupList || materialSetupList.length === 0) {
      throw new AppError('Esta lista não existe no Setup', 404);
    }

    const feeders = await this.feederRepository.findByFeederName(feeder_code);

    if (!feeders) {

      const t = {
        component: '',
        id_employee,
        list_code,
        machine : '',
        module,
        position,
        side : 0,
        status: 'Este feeder não existe',
        component_new: '',
        component_old: '',
        feeder_new: '',
        feeder_old: feeder_code,

    }
      // criar If para qualidade, feeder e refil


        if(quality.length === 1){
        const logErrorQuality = await this.materialLogQualityRepository.create(
          t
        );
      }

        if(refil.length === 1){
        const logErrorRefil = await this.materialLogRefilRepository.create(
          t
        );
      }

        if(feeder.length === 1){
        const logErrorFeeder = await this.materialLogFeederRepository.create(
          t
        );
      }
      throw new AppError('Este feeder não existe', 404);
    }

    const feederFromList = materialSetupList.find(
      (material) => material.id_feeder === feeders.id,
    );

    if (!feederFromList) {
      const feederFromListFeeders =
        await this.materialChangeFeederRepository.findChangeFeederByListCodeAndFeederNew(
          list_code,
          feeders.id,
        );

      if (
        feederFromListFeeders &&
        feederFromListFeeders.position !== position
      ) {
        throw new AppError(
          'Este Feeder não pertence a esta posição no registro de troca',
        );
      }

      return;
    }

    const feederFromListFeeders =
      await this.materialChangeFeederRepository.findChangeFeederByListCodeAndFeederNew(
        list_code,
        feeders.id,
      );

    if (feederFromListFeeders && feederFromListFeeders.position !== position) {
      throw new AppError(
        'Este Feeder não pertence a esta posição no registro de troca',
      );
    }
    if (feederFromList.position !== position && !feederFromListFeeders) {
      throw new AppError('Este Feeder não pertence a esta posição');
    }
  }
}
