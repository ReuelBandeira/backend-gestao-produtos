import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Line from '../infra/typeorm/entities/Line';
import ILineRepository from '../repositories/ILineRepository';

interface IRequest {
  line_name: string;
  description: string;
}

@injectable()
export default class CreateLineService {
  constructor(
    @inject('LineRepository')
    private lineRepository: ILineRepository,
  ) {}

  async execute({ line_name, description }: IRequest): Promise<Line> {
    const checkIfProductNameExist = await this.lineRepository.findByLineName(
      line_name,
    );

    if (checkIfProductNameExist) {
      throw new AppError(`Essa Linha já existe`);
    }

    const product = await this.lineRepository.create({
      line_name,
      description,
    });

    return product;
  }
}
