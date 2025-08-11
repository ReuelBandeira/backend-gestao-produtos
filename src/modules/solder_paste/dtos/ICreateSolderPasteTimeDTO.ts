import ConfigureSoldePasteTime from '../infra/typeorm/entities/ConfigureSoldePasteTime';

export enum ProviderTypePaste {
  LEAD_FREE = 'lead_free',
  TIM_LEAD = 'tim_lead',
}

export default interface ICreateSolderPasteTimeDTO {
  type_paste: ProviderTypePaste;
  thaw_time: number;
  time_use_with_lid_closed: number;
  time_use_with_lid_open: number;
  id_employee: number;
  id_provider:number;
}
export interface SolderPasteTimePagination {
  solderPasteTime: ConfigureSoldePasteTime[];
  totalProvider: number;
  totalPages: number;
  id_provider:number;
}
