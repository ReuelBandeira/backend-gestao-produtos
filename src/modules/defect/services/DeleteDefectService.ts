import Defect from '@modules/defect/infra/typeorm/entities/Defect';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDefectRepository from '../repositories/IDefectRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteDefecteService {
  constructor(
    @inject('DefectRepository')
    private defectRepository: IDefectRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Defect> {

    const validation_delete = await this.defectRepository.deleteValidation(id);

    if (validation_delete.length !==0) {
      throw new AppError(`Esse Defeito não pode ser excluído,pois encontra-se em uso na Manutenção de Feeders.`);
    };

    const defect = await this.defectRepository.findById(id);

    if (!defect) {
      throw new AppError(`O defeito com o id: ${id} não existe.`);
    }

    await this.defectRepository.delete(id);

    return defect;
  }
}
