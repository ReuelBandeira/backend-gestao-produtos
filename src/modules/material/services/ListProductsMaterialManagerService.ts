/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { MaterialManager } from '../infra/typeorm/entities/MaterialManager';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';

interface IRequest {
  list_code: string
}

@injectable()
export default class ListProductsMaterialManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
  ) {}

  public async execute(
    list_code: string
  ): Promise<MaterialManager[]> {

    const materialListProducts = await this.materialRepository.findDetailsToPdfByListCode(
      list_code,
    );

    if (!materialListProducts || materialListProducts.length === 0) {
      throw new AppError('Não existe dados', 404);
    }

    return materialListProducts;
  }
}
