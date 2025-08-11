import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILineRepository from '../repositories/ILineRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteLineService {
  constructor(
    @inject('LineRepository')
    private lineRepository: ILineRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const line = await this.lineRepository.findById(id);

    if (!line) {
      throw new AppError(`Essa linha não existe`);
    }

    await this.lineRepository.delete(id);
  }
}
