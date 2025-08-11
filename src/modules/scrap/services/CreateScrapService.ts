/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import IMaterialManagerRepository from '@modules/material/repositories/IMaterialManagerRepository';
import ITrackingRepository from '@modules/trackings/repositories/ITrackingRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateScrapDTO from '../dtos/ICreateScrapDTO';
import Scrap from '../infra/typeorm/entities/Scrap';
import IScrapRepository from '../repositories/IScrapRepository';

@injectable()
export default class CreateScrapService {
  constructor(
    @inject('ScrapRepository')
    private scrapRepository: IScrapRepository,

    @inject('MaterialManagerRepository')
    private materialManagerRepository: IMaterialManagerRepository,

    @inject('TrackingRepository')
    private trackingRepository: ITrackingRepository
  ) {}

  async execute(data: ICreateScrapDTO): Promise<Scrap> {
    if (data.type === 'componente') {
      if (!data.list_code) {
        throw new AppError('Número da lista deve ser informado', 400);
      }



      // Validar se já existe um scrap para o componente
      const scrapComponentExist =
        await this.scrapRepository.findByComponentAndListCode(
          data.serial_number,
          data.list_code
        );

      if (scrapComponentExist) {
        throw new AppError(
          'Já existe um scrap para o componente informado',
          409
        );
      }
    } else {
      // Validar se existe o número de série
      const tracking = await this.trackingRepository.checkIfExists(
        data.serial_number
      );

      if (!tracking) {
        throw new AppError('Número de série não encontrado', 404);
      }

      // Validar se já existe um scrap para o número de série informado
      const scrapSerialExist = await this.scrapRepository.findBySerial(
        data.serial_number
      );

      if (scrapSerialExist) {
        throw new AppError(
          'Já existe um scrap para o número de série informado',
          409
        );
      }
    }

    const scrap = await this.scrapRepository.create({
      ...data,
      number_plates_panel:
        data.type === 'painel' ? data.number_plates_panel : undefined,
      list_code: data.type === 'componente' ? data.list_code : undefined,
    });

    return scrap;
  }
}
