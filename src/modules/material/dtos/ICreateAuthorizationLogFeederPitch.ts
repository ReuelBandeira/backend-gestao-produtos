import  MaterialAuthorizationLogFeederPitch from '../infra/typeorm/entities/MaterialAuthorizationLogFeederPitch';

export interface ICreateAuthorizationLogFeederPitchDTO {
  id_employee: number;
  //
  id_employee_authorization: number;
  //
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
  materials: MaterialAuthorizationLogFeederPitch[];
  totalMaterials: number;
  totalPages: number;
}
