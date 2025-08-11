import Provider from '../infra/typeorm/entities/Provider';

export enum ProviderTypePaste {
  LEAD_FREE = 'lead_free',
  TIM_LEAD = 'tim_lead',
}
export default interface ICreateSolderPasteDTO {
  id_provider: number;
  id_employee: number;
  quantity: number;
  type_paste: ProviderTypePaste;
}
export interface ProviderPagination {
  solderPaste: Provider[];
  totalSolderPaste: number;
  totalPages: number;
}
