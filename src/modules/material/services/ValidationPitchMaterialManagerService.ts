/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';

interface IRequest {
  list_code: string;
  moduleMaterial: string;
  position: number;
}

interface IResponse {
  status: string;
  message: string;
  feederPitch: number;
}

@injectable()
export default class ValidationPitchMaterialManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
  ) {}

  public async execute({
    list_code,
    moduleMaterial,
    position,
  }: IRequest): Promise<IResponse> {
    const materialList = await this.materialRepository.findDetailsByListCode(
      list_code,
    );

    if (!materialList || materialList.length === 0) {
      throw new AppError('Esta lista não existe', 404);
    }

    const [machineCode, moduleM, side] = moduleMaterial.split('-');

    const sideParsed = parseInt(side);

    const existsModule = materialList.find(
      (material) =>
        material.machine === machineCode &&
        material.module === moduleM &&
        material.side === sideParsed &&
        material.position === position,
    );

    if (!existsModule) {
      throw new AppError('Este módulo não existe na lista', 404);
    }

    return {
      status: 'success',
      message: 'Campo Válido',
      feeder_pitch: existsModule?.feeder_pitch,
    };
  }
}
