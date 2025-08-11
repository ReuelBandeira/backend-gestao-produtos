import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IMaterialManagerSetupRepository from '../repositories/IMaterialManagerSetupRepository';
import IMaterialManagerLogQualityRepository from '../repositories/IMaterialManagerLogQualityRepository';
import IMaterialManagerLogRefilRepository from '../repositories/IMaterialManagerLogRefilRepository';
import IMaterialManagerLogFeederRespository from '../repositories/IMaterialManagerLogFeederRespository'

interface IRequest {
  list_code: string;
  id_employee: number;
  refil: string;
  quality: string;
  feeder: string;
}


// ? Usado no Refil, Qualidade, Troca de Feeder
@injectable()
export default class ValidationListCodeRefilMaterialManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('MaterialManagerSetupRepository')
    private materialSetupRepository: IMaterialManagerSetupRepository,
    @inject('MaterialManagerLogQualityRepository')
    private materialLogQualityRepository: IMaterialManagerLogQualityRepository,
    @inject('MaterialManagerLogRefilRepository')
    private materialLogRefilRepository: IMaterialManagerLogRefilRepository,
    @inject('MaterialManagerLogFeederRepository')
    private materialLogFeederRepository: IMaterialManagerLogFeederRespository,
  ) {}

  public async execute({
    list_code,
    id_employee,
    refil,
    quality,
    feeder,
  }: IRequest): Promise<void> {
    const materialList = await this.materialRepository.findDetailsByListCode(
      list_code,
    );

    if (!materialList || materialList.length === 0) {
      // criar função e passar os dados de log como parametro.

      const t = {
          component: '',
          id_employee,
          list_code,
          machine : '',
          module: '',
          position : 0,
          side : 0,
          status: 'Esta lista não existe',
          component_new: '',
          component_old: '',
          feeder_new: '',
          feeder_old: '',

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

        throw new AppError('Esta lista não existe', 404);


    }
    const { status } = materialList[0];

    if (status === 'available' || status === 'loading' || status === 'ready') {
      const t = {
        component: '',
        id_employee,
        list_code,
        machine : '',
        module: '',
        position : 0,
        side : 0,
        status: 'Esta lista não está ONLINE',
        component_new: '',
        component_old: '',
        feeder_new: '',
        feeder_old: '',

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

      throw new AppError('Esta lista não está ONLINE');
    }

    const totalSetup =
      await this.materialSetupRepository.getTotalSetupByListCode(
        String(list_code),
      );

    const totalComponent = materialList.length;


  }
}
