import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Provider from '../infra/typeorm/entities/Provider';
import IProviderRepository from '../repositories/IProviderRepository';

interface IRequest {
  id: number;
  provider_name: string;
  description_provider: string;
  type_paste:string;
  acronym:string;
  protocol:string;
  turns_on:string;

}

@injectable()
export default class UpdateProviderService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
  ) {}

  async execute({
    id,
    provider_name,
    description_provider,
    type_paste,
    acronym,
    protocol,
    turns_on

  }: IRequest): Promise<void> {



    const providerUpate = await this.providerRepository.findById(
      id,
    );

    if (!providerUpate) {
      throw new AppError(`O fornecedor: ${provider_name} não existeee.`);
    }

    await this.providerRepository.update(
      id,
      provider_name,
      description_provider,
      type_paste,
      acronym,
      protocol,
      turns_on
    );

  }
}
