import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Line from '../infra/typeorm/entities/Line';
import ILineRepository from '../repositories/ILineRepository';

interface IRequest {
  id: number;
  line_name: string;
  description: string;
}

@injectable()
export default class UpdateLineService {
  constructor(
    @inject('LineRepository')
    private lineRepository: ILineRepository,
  ) {}

  async execute({ id, line_name, description }: IRequest): Promise<Line> {
    const lineUpdate = await this.lineRepository.findById(id);

    if (!lineUpdate) {
      throw new AppError(`Essa Linha ${line_name} não existe.`);
    }

    Object.assign(lineUpdate, {
      line_name,
      description,
    });

    const updateLine = await this.lineRepository.update(lineUpdate);

    return updateLine;
  }
}
