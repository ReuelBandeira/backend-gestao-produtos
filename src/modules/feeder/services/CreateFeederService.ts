import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Feeder } from '../infra/typeorm/entities/Feeder';
import { IFeederRepository } from '../repositories/IFeederRepository';

interface IRequest {
  feeder_code: string;
  mouting_limit: number;
  used_qty?: number;
  id_type_feeder: number;
}

@injectable()
export class CreateFeederService {
  constructor(
    @inject('FeederRepository')
    private feederRepository: IFeederRepository,
  ) {}

  async execute({
    feeder_code,
    mouting_limit,
    id_type_feeder,
  }: IRequest): Promise<Feeder> {
    const checkIfFeederExist = await this.feederRepository.findByFeederName(
      feeder_code,
    );

    if (checkIfFeederExist) {
      throw new AppError(`Esse Feeder já existe`);
    }

    const feeder = this.feederRepository.create({
      feeder_code,
      mouting_limit,
      used_qty: 0,
      id_type_feeder,
    });

    return feeder;
  }
}
