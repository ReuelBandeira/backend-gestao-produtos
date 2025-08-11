/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SolderPaste, {ProviderTypePaste} from '../infra/typeorm/entities/SolderPaste';
import ISolderPasteRepository from '../repositories/ISolderPasteRepository';

interface IRequest {
  id_provider: number;
  id_employee: number;
  quantity:number;
  type_paste: ProviderTypePaste;
}

@injectable()
export default class CreateSolderPasteService {
  constructor(
    @inject('SolderPasteRepository')
    private solderPasteRepository: ISolderPasteRepository,
  ) {}

  async execute({
    id_provider,
    id_employee,
    quantity,
    type_paste,
  }: IRequest): Promise<SolderPaste> {


    const check_conf_provider = await this.solderPasteRepository.conf_day(id_provider);

    if (check_conf_provider?.length == 0) {
      throw new AppError(`Não existe uma configuração de pasta para este fornecedor. Favor verificar!`);
    }

    const provider = await this.solderPasteRepository.create({
      id_provider,
      id_employee,
      quantity,
      type_paste,
    });

    return provider;
  }
}
