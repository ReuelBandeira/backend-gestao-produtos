import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IFilterScrapDTO from '../dtos/IFilterScrapDTO';
import IScrapRepository from '../repositories/IScrapRepository';
import Scrap from '../infra/typeorm/entities/Scrap';

@injectable()
export default class FindAllScrapsService {
  constructor(
    @inject('ScrapRepository')
    private scrapRepository: IScrapRepository
  ) {}

  async execute(data: Omit<IFilterScrapDTO, 'page'>): Promise<Scrap[]> {
    if (
      (data.end_date && !data.start_date) ||
      (!data.end_date && data.start_date)
    ) {
      throw new AppError('Intervalo de data incorreto', 400);
    }
    return await this.scrapRepository.findAllScraps(data);
  }
}
