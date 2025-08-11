import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Feeder } from '../infra/typeorm/entities/Feeder';
import { IFeederRepository } from '../repositories/IFeederRepository';

interface IRequest {
  feeder_code: string;
  status?: string;
  mouting_limit: number;
  id_type_feeder: number;
}

@injectable()
export default class UpdateFeederService {
  constructor(
    @inject('FeederRepository')
    private feederRepository: IFeederRepository,
  ) {}

  async execute({
    feeder_code,
    status,
    mouting_limit,
    id_type_feeder,
  }: IRequest): Promise<Feeder> {
    const feederUpdate = await this.feederRepository.findByFeederName(
      feeder_code,
    );

    if (!feederUpdate) {
      throw new AppError(`Esse feeder ${feeder_code} não existe`);
    }

    Object.assign(feederUpdate, {
      status,
      mouting_limit,
      id_type_feeder,
    });

    const updateFeeder = await this.feederRepository.update(feederUpdate);

    return updateFeeder;
  }
}
