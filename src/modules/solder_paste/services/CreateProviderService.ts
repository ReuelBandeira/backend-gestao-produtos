/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Provider from '../infra/typeorm/entities/Provider';
import IProviderRepository from '../repositories/IProviderRepository';

interface IRequest {
  provider_name: string;
  description_provider: string;
  type_paste:string;
  acronym:string;
  protocol:string;
  turns_on:string;

}

@injectable()
export default class CreateProviderService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
  ) {}

  async execute({
    provider_name,
    description_provider,
    type_paste,
    acronym,
    protocol,
    turns_on
  }: IRequest): Promise<Provider> {

    const checkAcronymExist = await this.providerRepository.findByAcronymName(
      acronym,
    );

    if (checkAcronymExist) {
      throw new AppError(`Esse acrônimo/sigla já existe! `);
    }

    const provider = await this.providerRepository.create({
      provider_name,
      description_provider,
      type_paste,
      acronym,
      protocol,
      turns_on
    });

    return provider;
  }
}
