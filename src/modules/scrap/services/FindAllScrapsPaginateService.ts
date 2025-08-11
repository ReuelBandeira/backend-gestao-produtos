import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IScrapRepository from '../repositories/IScrapRepository';
import IFilterScrapDTO from '../dtos/IFilterScrapDTO';
import IPaginateScrapDTO from '../dtos/IPaginateScrapDTO';

@injectable()
export default class FindAllScrapsPaginateService {
  constructor(
    @inject('ScrapRepository')
    private scrapRepository: IScrapRepository
  ) {}

  async execute(data: IFilterScrapDTO): Promise<IPaginateScrapDTO> {
    if (
      (data.end_date && !data.start_date) ||
      (!data.end_date && data.start_date)
    ) {
      throw new AppError('Intervalo de data incorreto', 400);
    }

    return await this.scrapRepository.findAllScrapsPaginate(data);
  }
}
