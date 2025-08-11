import  MaterialManagerLogQuality  from '../infra/typeorm/entities/MaterialManagerLogQuality';

export interface ICreateMaterialLogQualityDTO {
  component: string;
  id_employee: number;
  list_code: string;
  machine: string;
  module: string;
  position: number;
  side: number;
  status: string;
  qr_code_information: string
}

export interface IMaterialPagination {
  materials: MaterialManagerLogQuality[];
  totalMaterials: number;
  totalPages: number;
}
