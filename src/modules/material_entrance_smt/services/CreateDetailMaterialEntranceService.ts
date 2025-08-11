import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import DetailMaterialEntrance from '../infra/typeorm/entities/DetailMaterialEntrance';
import IDetailMaterialEntranceRepository from '../repositories/IDetailMaterialEntranceRepository';

interface IRequest {
  id_material_entrance_smt : number;
  component: string;
  component_quantity: number;
  uc_code: string;
  string_qr_code: string;
  serial_component: string;
  main_component:string;
  id_employee: number;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('DetailMaterialEntranceRepository')
    private detailMaterialEntranceRepository: IDetailMaterialEntranceRepository,
  ) {}

  async execute({
    id_material_entrance_smt ,
    component,
    component_quantity,
    uc_code,
    string_qr_code,
    serial_component,
    main_component,
    id_employee}: IRequest): Promise<DetailMaterialEntrance> {

    const material = await this.detailMaterialEntranceRepository.create({
      id_material_entrance_smt,
      component,
      component_quantity,
      uc_code,
      string_qr_code,
      serial_component,
      main_component,
      id_employee
    });

    return material;
  }
}
