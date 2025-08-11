import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Defect, { DefectType } from '../infra/typeorm/entities/Defect';
import IDefectRepository from '../repositories/IDefectRepository';

interface IRequest {
  description: string;
  code:string;
  type: DefectType;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('DefectRepository')
    private defectRepository: IDefectRepository,
  ) {}

  async execute({ description,code,type }: IRequest): Promise<Defect> {
    const checkDescriptionExist = await this.defectRepository.findByName(description);

    if (checkDescriptionExist) {
      throw new AppError(`Esse defeito já existe`);
    }

    const checkCodeExist = await this.defectRepository.findByCode(code) as any;

    const checkDel = checkCodeExist.map(function (e: any) {
      return e.deleted_at;
    });

    if (checkDel.length === 1) {
      throw new AppError(`Esse código já existe ou foi excluido! Por favor usar outro código`);
    }

    const defect = await this.defectRepository.create({
      description,
      code,
      type
    });

    return defect;
  }
}
