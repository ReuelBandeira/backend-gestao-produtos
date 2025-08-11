import SolderPasteControll from '../infra/typeorm/entities/SolderPasteControll';

export enum ProviderTypePaste {
  LEAD_FREE = 'lead_free',
  TIM_LEAD = 'tim_lead',
}
export default interface ICreateSolderPasteControllDTO {
  serial_paste: string;
  datetime_freezer: Date;
  datetime_unfreezer: Date;
  datetime_use: Date;
  status: string
  id_employee: number;
  type_paste: ProviderTypePaste;
  id_provider: number;
  expiration_date:string;
  manufacturing_date: string;
  lot_number : number;
  weight: number;
  id_line: number;
  quantity_mixer: number;
}
export interface SolderPasteControllPagination {
  solderPasteControll: SolderPasteControll[];
  totalSolderPasteControll: number;
  totalPages: number;
}
