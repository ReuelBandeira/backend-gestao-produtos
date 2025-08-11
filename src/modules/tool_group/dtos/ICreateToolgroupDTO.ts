import Toolgroup from '../infra/typeorm/entities/Toolgroup';

export default interface ICreateToolgroupDTO {
  toolgroup_name: string;
  description_toolgroup: string;
  isStencil: boolean

}
export interface ToolgroupPagination {
  toolgroup: Toolgroup[];
  totalToolgroup: number;
  totalPages: number;

}
