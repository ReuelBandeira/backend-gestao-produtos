/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaterialManagerSetupRepository from '../repositories/IMaterialManagerSetupRepository';

interface IRequest {
  list_code: string
}

interface IResponse {
  status: string;
  message: string;
}

@injectable()
export default class LogSetupMaterialManagerService {
  constructor(
    @inject('MaterialManagerSetupRepository')
    private materialSetupRepository: IMaterialManagerSetupRepository,
  ) {}

  public async execute(
    list_code: string
  ): Promise<IResponse> {

    const materialListLog = await this.materialSetupRepository.findSetupByLog(
      list_code,
    );

    if (!materialListLog || materialListLog.length === 0) {
      throw new AppError('Não existe dados', 404);
    }

    return {

      status: 'success',
      message: 'Log',
    };
  }
}
