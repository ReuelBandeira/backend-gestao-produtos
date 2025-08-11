/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Defect from '../infra/typeorm/entities/Defect';
import IDefectRepository from '../repositories/IDefectRepository';

interface IRequest {
  id: number;
  description: string;
}

@injectable()
export default class UpdateDefectService {
  constructor(
    @inject('DefectRepository')
    private defectRepository: IDefectRepository,
  ) {}

  async execute({ id, description }: IRequest): Promise<Defect> {
    const defect = await this.defectRepository.findById(id);



    if (!defect) {
      throw new AppError(`Este defeito: ${description} não existe`);
    }


    Object.assign(defect, {
      description,
    });

    await this.defectRepository.update(defect);

    return defect;
  }
}
