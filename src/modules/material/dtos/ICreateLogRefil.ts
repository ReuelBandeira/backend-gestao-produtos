import  MaterialManagerLogRefil  from '../infra/typeorm/entities/MaterialManagerLogRefil';

export interface ICreateMaterialLogRefilDTO {
  id_employee: number;
  list_code: string;
  machine: string;
  module: string;
  position: number;
  side: number;
  component_new: string;
  component_old: string;
  status: string;
  qr_code_information_old: string;
  qr_code_information_new: string;
  feeder_pitch: number;
}

export interface IMaterialPagination {
  materials: MaterialManagerLogRefil[];
  totalMaterials: number;
  totalPages: number;
}
