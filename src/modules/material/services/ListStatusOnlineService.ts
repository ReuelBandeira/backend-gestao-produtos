/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOvenTemperatureRecordRepository from '@modules/oven_temperature_record/repositories/IOvenTemperatureRecordRepository';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IMaterialManagerSetupRepository from '../repositories/IMaterialManagerSetupRepository';

interface IRequest {
  list_code: string;
  id_employee: number;
}

@injectable()
export default class ListStatusOnlineService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('MaterialManagerSetupRepository')
    private materialSetupRepository: IMaterialManagerSetupRepository,
    @inject('OvenTemperatureRecordRepository')
    private ovenTemperatureRecordRepository: IOvenTemperatureRecordRepository,

  ) {}

  public async execute({ list_code, id_employee }: IRequest): Promise<void> {

    const findMaterialList =
      await this.materialRepository.findDetailsByListCode(list_code);

    if (findMaterialList?.length === 0) {
      throw new AppError('Esta lista não existe', 404);
    }

    const verifyOvenStatus =await this.ovenTemperatureRecordRepository.findByVerificationStatus(list_code);

    if(verifyOvenStatus!=="approved"){
      throw new AppError('Esta lista não foi Aprovada no Perfil de Forno. Favor verificar!');
    }

    const totalSetup =
      await this.materialSetupRepository.getTotalSetupByListCode(
        String(list_code),
      );

    const totalComponent = await this.materialRepository.totalComponentSMTList(list_code);

    if (totalSetup !== totalComponent) {

      throw new AppError('Esta lista não teve todos os componentes lidos');
    }

    const byStatusAvailable = await this.materialRepository.verifyListStatus(
      list_code,
    );

    if (byStatusAvailable.length != 0) {
      throw new AppError('Esta lista não pode ficar online.');
    }

    const verifyListLine =
      await this.materialSetupRepository.verifyLineList(
        String(list_code),
      );

    const verifyStatusListLine =
      await this.materialSetupRepository.verifyStatusLineList(
        Number(verifyListLine[0].id_line),
      );

    if (verifyStatusListLine.length != 0) {
      throw new AppError('Existe uma lista online na mesma linha.');
    }


    // ? Função pra deixar lista online
    await this.materialRepository.updateStatus(
      list_code,
      'online',
      id_employee,
    );
  }
}
