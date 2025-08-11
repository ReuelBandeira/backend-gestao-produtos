import InactivateTools from '../infra/typeorm/entities/InactivateTools';

export default interface ICreateInactivateToolsDTO {
    id_tooling_control: number;
    reason_tool_inactivation: string;
}
export interface InactivateToolsPagination {
  inactivateTools: InactivateTools[];
  totalInactivateTools: number;
  totalPages: number;
}
