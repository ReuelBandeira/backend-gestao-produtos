/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IFeederRepository } from '@modules/feeder/repositories/IFeederRepository';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IMaterialManagerChangeFeederRepository from '../repositories/IMaterialManagerChangeFeederRepository';
import MaterialManagerChangeFeeder from '../infra/typeorm/entities/MaterialManagerChangeFeeder';
import IMaterialManagerSetupRepository from '../repositories/IMaterialManagerSetupRepository';
import IMaterialManagerLogFeederRespository from '../repositories/IMaterialManagerLogFeederRespository'

interface IRequest {
  list_code: string;
  moduleMaterial: string;
  position: number;
  feeder_code_old: string;
  feeder_code_new: string;
  id_employee: number;
  feeder_old: string;
  feeder_new: string;
}

@injectable()
export default class CreateChangeFeederRegisterManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('MaterialManagerSetupRepository')
    private materialSetupRepository: IMaterialManagerSetupRepository,
    @inject('FeederRepository')
    private feederRepository: IFeederRepository,
    @inject('MaterialManagerChangeFeederRepository')
    private materialChangeFeederRepository: IMaterialManagerChangeFeederRepository,
    @inject('MaterialManagerLogFeederRepository')
    private materialLogFeederRepository: IMaterialManagerLogFeederRespository,
  ) { }

  public async execute({
    list_code,
    id_employee,
    moduleMaterial,
    position,
    feeder_code_old,
    feeder_code_new,
  }: IRequest): Promise<MaterialManagerChangeFeeder> {
    const materialList = await this.materialRepository.findDetailsByListCode(
      list_code,
    );

    if (!materialList || materialList.length === 0) {
      throw new AppError('Esta lista não existe', 404);
    }

    const { status } = materialList[0];

    if (status === 'available' || status === 'loading') {
      throw new AppError('Lista não está ONLINE');
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
      throw new AppError('Este módulo não existe na lista', 404);
    }

    const materialSetupList =
      await this.materialSetupRepository.findSetupByListCode(list_code);

    if (!materialSetupList || materialSetupList.length === 0) {
      throw new AppError('Esta lista não existe no Setup', 404);
    }

    const feederOld = await this.feederRepository.findByFeederName(
      feeder_code_old,
    );

    const feederNew = await this.feederRepository.findByFeederName(
      feeder_code_new,
    );

    if (!feederOld) {
      const t = {
        component: '',
        id_employee,
        list_code,
        machine : '',
        module: moduleMaterial,
        position,
        side : 0,
        status: 'Este Feeder Antigo não existe',
        component_new: '',
        component_old: '',
        feeder_new: feeder_code_new,
        feeder_old: feeder_code_old,

      }
      // criar If para qualidade, feeder e refil


        const logErrorFeeder = await this.materialLogFeederRepository.create(
          t
        );
      throw new AppError('Este Feeder Antigo não existe', 404);
    } else if (!feederNew) {
      const t = {
        component: '',
        id_employee,
        list_code,
        machine : '',
        module: moduleMaterial,
        position,
        side : 0,
        status: 'Este Feeder Novo não existe',
        component_new: '',
        component_old: '',
        feeder_new: feeder_code_new,
        feeder_old: feeder_code_old,

    }
      // criar If para qualidade, feeder e refil


        const logErrorFeeder = await this.materialLogFeederRepository.create(
          t
        );

      throw new AppError('Este Feeder Novo não existe', 404);
    }

    if (feederNew.status !== 'available') {
      const t = {
        component: '',
        id_employee,
        list_code,
        machine : '',
        module: moduleMaterial,
        position,
        side : 0,
        status: 'Este Feeder Novo não pode ser usado, verifique sua disponibilidade',
        component_new: '',
        component_old: '',
        feeder_new: feeder_code_new,
        feeder_old: feeder_code_old,

    }
      // criar If para qualidade, feeder e refil


        const logErrorFeeder = await this.materialLogFeederRepository.create(
          t
        );

      throw new AppError(
        'Este Feeder Novo não pode ser usado, verifique sua disponibilidade',
      );
    }

    const feederFromListOld = materialSetupList.find(
      (material) => material.id_feeder === feederOld.id,
    );

    if (!feederFromListOld) {
      const feederFromListFeeders =
        await this.materialChangeFeederRepository.findChangeFeederByListCodeAndFeederNew(
          list_code,
          feederOld.id,
        );

      if (
        feederFromListFeeders &&
        feederFromListFeeders.position !== position
      ) {
        throw new AppError(
          'Este Feeder não pertence a esta posição no registro de troca',
        );
      }
    }

    const feederFromListFeeders =
      await this.materialChangeFeederRepository.findChangeFeederByListCodeAndFeederNew(
        list_code,
        feederOld.id,
      );

    if (feederFromListFeeders && feederFromListFeeders.position !== position) {
      throw new AppError(
        'Este Feeder não pertence a esta posição no registro de troca',
      );
    }
    if (feederFromListOld?.position !== position && !feederFromListFeeders) {
      const t = {
        component: '',
        id_employee,
        list_code,
        machine : '',
        module: moduleMaterial,
        position,
        side : 0,
        status: 'Este Feeder não pertence a esta posição',
        component_new: '',
        component_old: '',
        feeder_new: feeder_code_new,
        feeder_old: feeder_code_old,

    }
      // criar If para qualidade, feeder e refil


        const logErrorFeeder = await this.materialLogFeederRepository.create(
          t
        );


      throw new AppError('Este Feeder não pertence a esta posição');
    }

    const { id: id_feeder_old } = feederOld;
    const { id: id_feeder_new } = feederNew;

    const managerFeederChanged =
      await this.materialChangeFeederRepository.create({
        list_code,
        machine: machineCode,
        module: moduleM,
        side: sideParsed,
        position,
        id_feeder_old,
        id_feeder_new,
        id_employee,
      });
      const t = {
        component: '',
        id_employee,
        list_code,
        machine: '',
        module: moduleMaterial,
        position,
        side: 0,
        status: 'Finalizado!!!',
        component_new: '',
        component_old: '',
        feeder_new: feeder_code_new,
        feeder_old: feeder_code_old,

      }
      // criar If para qualidade, feeder e refil

      const logErrorFeeder = await this.materialLogFeederRepository.create(
        t
      );

    Object.assign(feederNew, {
      status: 'using',
    });
    await this.feederRepository.update(feederNew);

    Object.assign(feederOld, {
      status: 'available',
    });
    await this.feederRepository.update(feederOld);

    return managerFeederChanged;
  }
}
