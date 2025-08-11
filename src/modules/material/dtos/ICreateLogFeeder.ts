import  MaterialManagerLogFeeder  from '../infra/typeorm/entities/MaterialManagerLogFeeder';

export interface ICreateMaterialLogFeederDTO {
  id_employee: number;
  list_code: string;
  machine: string;
  module: string;
  position: number;
  side: number;
  feeder_new: string;
  feeder_old: string;
  status: string;
}

export interface IMaterialPagination {
  materials: MaterialManagerLogFeeder[];
  totalMaterials: number;
  totalPages: number;
}
