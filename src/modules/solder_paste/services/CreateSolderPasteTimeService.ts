/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ConfigureSoldePasteTime , {ProviderTypePaste}from '../infra/typeorm/entities/ConfigureSoldePasteTime';
import ISolderPasteTimeRepository from '../repositories/ISolderPasteTimeRepository';

interface IRequest {
  type_paste: ProviderTypePaste;
  thaw_time: number;
  time_use_with_lid_closed: number;
  time_use_with_lid_open: number;
  id_employee: number;
  id_provider:number;


}

@injectable()
export default class CreateSolderPasteTimeService {
  constructor(
    @inject('SolderPasteTimeRepository')
    private solderPasteTimeRepository: ISolderPasteTimeRepository,
  ) {}

  async execute({
    thaw_time,
    time_use_with_lid_closed,
    time_use_with_lid_open,
    type_paste,
    id_employee,
    id_provider
  }: IRequest): Promise<ConfigureSoldePasteTime> {

    const checkSerialExist = await this.solderPasteTimeRepository.findByTypeProviderName(
      id_provider,
    );
    if (checkSerialExist) {
      throw new AppError(`Essa configuração ja existe para esse fornecedor! `);
    }



    const provider = await this.solderPasteTimeRepository.create({
      thaw_time,
      time_use_with_lid_closed,
      time_use_with_lid_open,
      type_paste,
      id_employee,
      id_provider
    });

    return provider;
  }
}
