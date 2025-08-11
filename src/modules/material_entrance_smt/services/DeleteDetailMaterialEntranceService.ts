import DetailMaterialEntrance from '@modules/material_entrance_smt/infra/typeorm/entities/DetailMaterialEntrance';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDetailMaterialEntranceRepository from '../repositories/IDetailMaterialEntranceRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteMaterialEntranceService {
  constructor(
    @inject('DetailMaterialEntranceRepository')
    private detailMaterialEntranceRepository: IDetailMaterialEntranceRepository,
  ) {}

  async execute({ id }: IRequest): Promise<DetailMaterialEntrance> {

    const detailEntrance = await this.detailMaterialEntranceRepository.findById(id);

    if (!detailEntrance) {
      throw new AppError(`O material com o id: ${id} não existe.`);
    }

    await this.detailMaterialEntranceRepository.delete(id);

    return detailEntrance;
  }

}
