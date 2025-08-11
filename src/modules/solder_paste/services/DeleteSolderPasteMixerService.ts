import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ISolderPasteMixerRepository from '../repositories/ISolderPasteMixerRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteSolderPasteMixerService {
  constructor(
    @inject('SolderPasteMixerRepository')
    private SolderPasteMixerRepository: ISolderPasteMixerRepository,

  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const SolderPasteMixer_name = await this.SolderPasteMixerRepository.findById(id);

    if (!SolderPasteMixer_name) {
      throw new AppError(`Esse serial não existe.`);
    }

    await this.SolderPasteMixerRepository.delete(id);
  }


}
