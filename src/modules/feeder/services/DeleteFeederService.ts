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

    const validation_delete = await this.feederRepository.deleteValidation(id);

    if (validation_delete.length !==0) {
      throw new AppError(`Esse Feeder não pode ser excluído,pois encontra-se em uso na Manutenção de Feeders.`);
    };

    const feeder = await this.feederRepository.findById(id);

    if (!feeder) {
      throw new AppError(`Esse feeder não existe`);
    }

    await this.feederRepository.delete(id);
  }
}
