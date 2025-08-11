/* eslint-disable radix */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IQualityHeadManagerRepository from '../repositories/IQualityHeadManagerRepository';
import IQualityBodyManagerRepository from '../repositories/IQualityBodyManagerRepository';
import { QualityHeadManager } from '../infra/typeorm/entities/QualityHeadManager';
import IMaterialManagerLogQualityRepository from '../repositories/IMaterialManagerLogQualityRepository';
import IMaterialManagerLogRefilRepository from '../repositories/IMaterialManagerLogRefilRepository';
import IMaterialManagerLogFeederRespository from '../repositories/IMaterialManagerLogFeederRespository'

interface IRequest {
  list_code: string;
  moduleMaterial: string;
  component: string;
  id_employee: number;
  qr_code_information: string;

}

@injectable()
export default class CreateQualityRegisterManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('QualityHeadManagerRepository')
    private qualityHeadRepository: IQualityHeadManagerRepository,
    @inject('QualityBodyManagerRepository')
    private qualityBodyRepository: IQualityBodyManagerRepository,
    @inject('MaterialManagerLogQualityRepository')
    private materialLogQualityRepository: IMaterialManagerLogQualityRepository,
    @inject('MaterialManagerLogRefilRepository')
    private materialLogRefilRepository: IMaterialManagerLogRefilRepository,
    @inject('MaterialManagerLogFeederRepository')
    private materialLogFeederRepository: IMaterialManagerLogFeederRespository,
  ) { }

  public async execute({
    list_code,
    moduleMaterial,
    component,
    id_employee,
    qr_code_information
  }: IRequest): Promise<QualityHeadManager> {
    const materialList = await this.materialRepository.findDetailsByListCodeQuality(
      list_code,
    );

    if (!materialList || materialList.length === 0) {
      throw new AppError('Esta lista não existe', 404);
    }

    const { status } = materialList[0];

    if (status === 'available' || status === 'loading') {
      throw new AppError('Esta lista não está ONLINE');
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

    const positionInModule = materialList.filter(
      (material) =>
        material.machine === machineCode &&
        material.module === moduleM &&
        material.side === sideParsed,
    );


    const qualityHead =
      await this.qualityHeadRepository.findQualityOpenByListCode(
        list_code,
        machineCode,
        moduleM,
        sideParsed,
      );




    // ? Caso seja a primeira validação naquele módulo
    if (!qualityHead) {
      /**
       * Precisa validar a primeira posição
       */

      const firstPosition = positionInModule[0];

      const { position } = firstPosition;

      const componentFromList =
        await this.materialRepository.findComponentOrAlternateMaterial(
          component,
          moduleM,
          parseInt(side),
          position,
          list_code,
        );


      if (!componentFromList) {
        const t = {
          component,
          id_employee,
          list_code,
          machine: '',
          module: moduleMaterial,
          position: 0,
          side: 0,
          status: `Este Componente não é o primeiro registrado no módulo. Leia a posição ${position}`,
          qr_code_information,

        }
        // criar If para qualidade, feeder e refil

        const logErrorQuality = await this.materialLogQualityRepository.create(
          t
        );

        throw new AppError(
          `Este Componente não é o primeiro registrado no módulo. Leia a posição ${position}`,
        );
      }

      const qualityHeadCreated = await this.qualityHeadRepository.create({
        list_code,
        machine: machineCode,
        module: moduleM,
        side: sideParsed,
        status: 'online',
        id_employee,

      });
      const { id: id_quality_head } = qualityHeadCreated;

      const qualityBodyCreated = await this.qualityBodyRepository.create({
        list_code,
        machine: machineCode,
        module: moduleM,
        side: sideParsed,
        position,
        component,
        id_employee,
        id_quality_head,
        qr_code_information
      });

      const t = {
        component,
        id_employee,
        list_code,
        machine: '',
        module: moduleMaterial,
        position,
        side: 0,
        status: 'finalizado!!!',
        qr_code_information

      }
      // criar If para qualidade, feeder e refil

      const logErrorQuality = await this.materialLogQualityRepository.create(
        t
      );

      const totalPosition = await this.materialRepository.totalComponentSMTListQuality(
        list_code,
        machineCode,
        moduleM,
        sideParsed,
      );

      if (totalPosition === 1) {
        // ? Deve  mudar status  pra offline

        await this.qualityHeadRepository.updateStatus(
          list_code,
          machineCode,
          moduleM,
          sideParsed,
          'offline',
          id_employee,
        );
      }

      Object.assign(qualityHeadCreated, {
        qualityBody: [qualityBodyCreated],
      });

      return qualityHeadCreated;
    }

    const { qualityBody } = qualityHead;

    const lastRegiter = qualityBody[qualityBody.length - 1];

    const positionsPending = positionInModule.filter(
      (material) => material.position > lastRegiter.position,
    );


    if (positionsPending.length === 0) {
      // ? Aqui é preciso deixar offline a lista

      await this.qualityHeadRepository.updateStatus(
        list_code,
        machineCode,
        moduleM,
        sideParsed,
        'offline',
        id_employee,
      );
      throw new AppError('A inspeção da Qualidade nesse módulo foi finalizado');
    }

    const nextPosition = positionsPending[0];

    const { position } = nextPosition;

    const componentFromList =
      await this.materialRepository.findComponentOrAlternateMaterial(
        component,
        moduleM,
        parseInt(side),
        position,
        list_code,
      );

    if (!componentFromList) {
      const t = {
        component,
        id_employee,
        list_code,
        machine: '',
        module: moduleMaterial,
        position: 0,
        side: 0,
        status: `Este Componente não é o próximo a ser inspecionado. Leia a posição ${position}`,
        qr_code_information

      }
      // criar If para qualidade, feeder e refil



      const logErrorQuality = await this.materialLogQualityRepository.create(
        t
      );
      throw new AppError(
        `Este Componente não é o próximo a ser inspecionado. Leia a posição ${position}`,
      );
    }

    const { id: id_quality_head } = qualityHead;

    const qualityBodyCreated = await this.qualityBodyRepository.create({
      list_code,
      machine: machineCode,
      module: moduleM,
      side: sideParsed,
      position,
      component,
      id_employee,
      id_quality_head,
      qr_code_information
    });

    const totalByPosition = await this.materialRepository.totalComponentSMTListQuality(
      list_code,
      machineCode,
      moduleM,
      sideParsed,
    );

    const totalBody = await this.qualityBodyRepository.totalComponentBodyListQualityModule(
      list_code,
      machineCode,
      moduleM,
      sideParsed,
      qualityHead?.id
    );

    if (totalBody === totalByPosition) {
      // ? Aqui é preciso deixar offline a lista

      await this.qualityHeadRepository.updateStatus(
        list_code,
        machineCode,
        moduleM,
        sideParsed,
        'offline',
        id_employee,
      );
    }

    const t = {
      component,
      id_employee,
      list_code,
      machine: '',
      module: moduleMaterial,
      position,
      side: 0,
      status: 'finalizado!!!',
      qr_code_information,
    }
    // criar If para qualidade, feeder e refil



    const logErrorQuality = await this.materialLogQualityRepository.create(
      t
    );

    qualityHead.qualityBody.push(qualityBodyCreated);

    if (positionsPending.length === 1) {
      // ? Deve  mudar status  pra offline

      await this.qualityHeadRepository.updateStatus(
        list_code,
        machineCode,
        moduleM,
        sideParsed,
        'offline',
        id_employee,
      );

      Object.assign(qualityHead, {
        status: 'offline',
      });
    }

    return qualityHead;
  }
}
