import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
// eslint-disable-next-line import/no-unresolved
import { IFeederRepository } from '@modules/feeder/repositories/IFeederRepository';
import IMaterialManagerSetupRepository from '../repositories/IMaterialManagerSetupRepository';
import IMaterialManagerChangeFeederRepository from '../repositories/IMaterialManagerChangeFeederRepository';

interface IRequest {
  list_code: string;
  moduleMaterial: string;
  position: number;
  feeder_code: string;
}

interface IResponse {
  status: string;
  message: string;
}

@injectable()
export default class FeederValidationService {
  constructor(
    @inject('FeederRepository')
    private feederRepository: IFeederRepository,
    @inject('MaterialManagerSetupRepository')
    private materialSetupRepository: IMaterialManagerSetupRepository,
    @inject('MaterialManagerChangeFeederRepository')
    private materialChangeFeederRepository: IMaterialManagerChangeFeederRepository,

  ) {}

  public async execute({
    list_code,
    moduleMaterial,
    position,
    feeder_code }: IRequest): Promise<IResponse> {

    const checkFeederId = await this.feederRepository.checkFeeder(String(feeder_code));

    if (checkFeederId.length===0) {
      throw new AppError('Feeder não existe. Favor verificar!', 404);
    }

    const module = moduleMaterial.split("-");

    const validationFeederSetup = await this.materialSetupRepository.validationFeederSetup(String(list_code),String(module[1]),Number(position),Number(checkFeederId[0].id));

    const validationFeederChange = await this.materialChangeFeederRepository.validationFeederMaterialChange(String(list_code),String(module[1]),Number(position),Number(checkFeederId[0].id));

    if (validationFeederSetup.length ===0 && validationFeederChange.length===0  ) {
      throw new AppError('Feeder não pertence a esta posição. Favor verificar!', 404);
    }
    // teste subida

    return {
      status: 'success',
      message: 'Campo Válido',
    };
  }
}
