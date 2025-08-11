import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IMaterialManagerLogRefilRepository from '../repositories/IMaterialManagerLogRefilRepository';
import IMaterialManagerSetupRepository from '../repositories/IMaterialManagerSetupRepository';

interface IRequest {
  list_code: string;
  component: string;
  id_employee: number;
  position: number;
  module: string;
}

@injectable()
export default class ValidationComponentOldRefilManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('MaterialManagerLogRefilRepository')
    private materialLogRefilRepository: IMaterialManagerLogRefilRepository,
    @inject('MaterialManagerSetupRepository')
    private materialManagerSetupRepository: IMaterialManagerSetupRepository,
  ) {}

  public async execute({
    list_code,
    component,
    id_employee,
    position,
    module,
  }: IRequest): Promise<void> {
    const materialList = await this.materialRepository.findDetailsByListCode(
      list_code,
    );

    if (!materialList || materialList.length === 0) {
      throw new AppError('Esta lista não existe', 404);
    }

    const componentFromList = materialList.find(
      (material) =>
        material.main_components === component ||
        material.alternative_components === component,
    );

    if (!componentFromList) {
      const t = {
        component: '',
        id_employee,
        list_code,
        machine : '',
        module,
        position,
        side : 0,
        status: 'Este Componente não foi encontrado na lista',
        component_new: '',
        component_old: component,
        feeder_new: '',
        feeder_old: '',

      }

      const logErrorRefil = await this.materialLogRefilRepository.create(
        t
      );

      throw new AppError('Este Componente não foi encontrado na lista', 404);
    }

    const verifyComponentSetupRefil = await this.materialManagerSetupRepository.verifyComponentSetupRefil(
      list_code,
      component,
      position,
      module,
    );
  }
}
