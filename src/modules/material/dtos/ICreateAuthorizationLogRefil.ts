import  MaterialAuthorizationLogRefil  from '../infra/typeorm/entities/MaterialAuthorizationLogRefil';

export interface ICreateAuthorizationLogRefilDTO {
  id_employee: number;

  id_employee_authorization: number;

  list_code: string;
  machine: string;
  module: string;
  position: number;
  side: number;
  component_new: string;
  component_old: string;
  status: string;
}

export interface IMaterialPagination {
  materials: MaterialAuthorizationLogRefil[];
  totalMaterials: number;
  totalPages: number;
}
