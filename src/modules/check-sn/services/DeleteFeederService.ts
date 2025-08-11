import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IFeederRepository } from '../repositories/IFeederRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteFeederService {
  constructor(
    @inject('FeederRepository')
    private feederRepository: IFeederRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const feeder = await this.feederRepository.findById(id);

    if (!feeder) {
      throw new AppError(`Esse feeder não existe`);
    }

    await this.feederRepository.delete(id);
  }
}
