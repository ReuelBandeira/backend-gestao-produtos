import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IProviderRepository from '../repositories/IProviderRepository';


interface IRequest {
  id: number;

}

@injectable()
export default class DeleteProviderService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,

  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const provider_name = await this.providerRepository.findById(id);

    if (!provider_name) {
      throw new AppError(`Esse fornecedor não existe.`);
    }

    const acronym_provider =provider_name.acronym

    await this.providerRepository.updateDelete(id,acronym_provider);
    await this.providerRepository.delete(id);
  }


}
