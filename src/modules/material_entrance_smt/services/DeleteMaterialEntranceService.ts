import DetailMaterialEntrance from '@modules/material_entrance_smt/infra/typeorm/entities/DetailMaterialEntrance';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDetailMaterialEntranceRepository from '../repositories/IDetailMaterialEntranceRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteDetailMaterialEntranceService {
  constructor(
    @inject('DetailMaterialEntranceRepository')
    private detailMaterialEntranceRepository: IDetailMaterialEntranceRepository,
  ) {}

  async execute({ id }: IRequest): Promise<DetailMaterialEntrance> {


    // const validation_delete = await this.materialEntranceRepository.deleteValidation(id);

    // if (validation_delete.length !==0) {
    //   throw new AppError(`Essa Ação não pode ser excluída,pois encontra-se em uso na Gestão de Downtime.`);
    // };


    const Action = await this.detailMaterialEntranceRepository.findById(id);

    if (!Action) {
      throw new AppError(`O material com o id: ${id} não existe.`);
    }

    await this.detailMaterialEntranceRepository.delete(id);

    return Action;
  }
}
