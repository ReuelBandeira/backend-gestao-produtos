import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILineRepository from '@modules/lines/repositories/ILineRepository';

interface IRequest {
  line_name: string;
}

interface IResponse {
  status: string;
  message: string;
}

@injectable()
export default class ValidationLineNameSetupMaterialManagerService {
  constructor(
    @inject('LineRepository')
    private lineRepository: ILineRepository,
  ) {}

  public async execute({ line_name }: IRequest): Promise<IResponse> {
    const lineNameExists = await this.lineRepository.findByLineName(line_name);

    if (!lineNameExists) {
      throw new AppError('Esta Linha não existe', 404);
    }

    return {
      status: 'success',
      message: 'Campo Válido',
    };
  }
}
