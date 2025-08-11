import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MaterialEntrance from '../infra/typeorm/entities/MaterialEntrance';
import IMaterialEntranceRepository from '../repositories/IMaterialEntranceRepository';

interface IRequest {
  id_product : number;
  kit_quantity: number;
  production_order: string;
  id_employee: number;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('MaterialEntranceRepository')
    private materialEntranceRepository: IMaterialEntranceRepository,
  ) {}

  async execute({id_product,kit_quantity,production_order,id_employee}: IRequest): Promise<MaterialEntrance> {
    // const checkDescriptionExist = await this.materialEntranceRepository.findByName(description);

    // if (checkDescriptionExist) {
    //   throw new AppError(`Essa ação já existe`);
    // }

    const material = await this.materialEntranceRepository.create({
      id_product,
      kit_quantity,
      production_order,
      id_employee
    });

    return material;
  }
}
