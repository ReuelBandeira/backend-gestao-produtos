import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IWorkStationRepository from '../repositories/IWorkStationRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteWorkStationService {
  constructor(
    @inject('WorkStationRepository')
    private workStationRepository: IWorkStationRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const workStationExists = await this.workStationRepository.findById(id);

    if (!workStationExists) {
      throw new AppError('Essa estação de trabalho não existe');
    }

    await this.workStationRepository.delete(id);
  }
}
