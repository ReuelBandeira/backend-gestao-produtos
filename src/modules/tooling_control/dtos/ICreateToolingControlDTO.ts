import ToolingControl from '../infra/typeorm/entities/ToolingControl';

export default interface ICreateToolingControlDTO {
  id_toolgroup: number;
  id_product: number;
  description_tooling_control: string;
  amount_used: number,
  usage_limit: number;
}
export interface ToolingControlPagination {
  toolingControl: ToolingControl[];
  totalToolingControl: number;
  totalPages: number;
}
