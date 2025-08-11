import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CheckSN  from '../infra/typeorm/entities/CheckSN';
import { ICheckSNRepository } from '../repositories/ICheckSNRepository';

interface IRequest {
  feeder_code: string;
  mouting_limit: number;
  used_qty?: number;
  id_type_feeder: number;
}

@injectable()
export class CreateCheckSNService {
  constructor(
    @inject('FeederRepository')
    private checkSNRepository: ICheckSNRepository,
  ) {}

  async execute({
    serial_number,
    mouting_limit,
    id_type_feeder,
  }: IRequest): Promise<CheckSN> {

    const checkIfFeederExist = await this.checkSNRepository.findByCheckSN(
      serial_number,
    );

    if (checkIfFeederExist) {
      throw new AppError(`Esse Feeder já existe`);
    }

    const feeder = this.checkSNRepository.create({
      feeder_code,
      mouting_limit,
      used_qty: 0,
      id_type_feeder,
    });

    return feeder;
  }
}
