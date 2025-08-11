import IProductRepository from '@modules/products/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateSnCompositionDTO from '../dtos/ICreateSnCompositionDTO';
import SnComposition from '../infra/typeorm/entities/SnComposition';
import ISnCompositionRepository from '../repositories/ISnRepository';

@injectable()
export default class CreateSnCompositionService {
  constructor(
    @inject('SnCompositionRepository')
    private snCompositionRepository: ISnCompositionRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(data: ICreateSnCompositionDTO): Promise<SnComposition> {
    const product = await this.productRepository.findById(data.id_product)

    if (!product) {
      throw new AppError("Produto não encontrado", 404)
    }

    const checkExistSnCompositionWithProduct = await this.snCompositionRepository.findByProduct(data.id_product)

    if (checkExistSnCompositionWithProduct) {
      throw new AppError("Já existe uma regra de composição de SN para o produto informado", 400)
    }

    // eslint-disable-next-line no-param-reassign
    data = {
      ...data,
      array_format_sn: JSON.stringify(data.array_format_sn)
    }

    const snComposition = await this.snCompositionRepository.create(data)

    return snComposition;
  }
}
