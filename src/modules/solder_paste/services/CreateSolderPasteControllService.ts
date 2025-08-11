/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SolderPasteControll, {ProviderTypePaste} from '../infra/typeorm/entities/SolderPasteControll';
import ISolderPasteControllRepository from '../repositories/ISolderPasteControllRepository';

interface IRequest {

  serial_paste: string,
  datetime_freezer: Date,
  datetime_unfreezer: Date,
  datetime_use: Date,
  status: string,
  id_employee: number;
  type_paste: ProviderTypePaste;
  id_provider: number;
  expiration_date:string;
  manufacturing_date: string;
  lot_number : number;
  weight: number;
}

@injectable()
export default class CreateSolderPasteControllService {
  constructor(
    @inject('SolderPasteControllRepository')
    private solderPasteControllRepository: ISolderPasteControllRepository,
  ) {}

  async execute({
    serial_paste,
    datetime_freezer,
    datetime_unfreezer,
    datetime_use,
    status,
    id_employee,
    type_paste,
    id_provider,
    expiration_date,
    manufacturing_date,
    lot_number,
    weight,
  }: IRequest): Promise<SolderPasteControll> {

    const provider = await this.solderPasteControllRepository.create({
      serial_paste,
      datetime_freezer,
      datetime_unfreezer,
      datetime_use,
      status,
      id_employee,
      type_paste,
      id_provider,
      expiration_date,
      manufacturing_date,
      lot_number,
      weight,
    });

    return provider;
  }
}
