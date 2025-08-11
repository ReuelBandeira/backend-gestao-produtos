import ILineRepository from '@modules/lines/repositories/ILineRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IMaterialManagerSetupRepository from '../repositories/IMaterialManagerSetupRepository';

interface IRequest {
  list_code: string;
  line_name: string;
  id_employee: number;
}

interface IResponse {
  totalComponent: number;
  totalSetup: number;
}

@injectable()
export default class ValidationListCodeSetupMaterialManagerService {
  constructor(
    @inject('LineRepository')
    private lineRepository: ILineRepository,
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('MaterialManagerSetupRepository')
    private materialSetupRepository: IMaterialManagerSetupRepository,
  ) {}

  public async execute({
    list_code,
    id_employee,
    line_name,
  }: IRequest): Promise<IResponse> {
    const exists = await this.materialRepository.validateFieldListMaterial(
      'list_code',
      list_code,
    );

    if (!exists) {
      throw new AppError('Esta lista não existe', 404);
    }

    const lineNameExists = await this.lineRepository.findByLineName(line_name);

    if (!lineNameExists) {
      throw new AppError('Esta Linha não existe', 404);
    }

    const totalComponent = await this.materialRepository.totalComponentSMTList(
      String(list_code),
    );
    const totalSetup = await this.materialSetupRepository.getTotalSetupByListCode(
      String(list_code),
    );
    const materiaListSetup = await this.materialSetupRepository.findSetupByListCode(
      list_code,
    );
    const { id: id_line } = lineNameExists;
    const lineAlreadyRegisteredInList = materiaListSetup.some(
      (material) => material.id_line === id_line,
    );

    if (!lineAlreadyRegisteredInList && totalSetup > 0) {
      throw new AppError('Esta lista não pertence a essa linha');
    }

    if (totalComponent === totalSetup) {
      throw new AppError('Setup já realizado desta lista');
    }

    await this.materialRepository.updateStatus(
      list_code,
      'loading',
      id_employee,
    );

    return {
      totalComponent,
      totalSetup,
    };
  }
}
