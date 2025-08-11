export interface ICreateFeederDTO {
  feeder_code: string;
  status?: string;
  mouting_limit: number;
  used_qty?: number;
  id_type_feeder: number;
  used_qty_total?:number;
}
