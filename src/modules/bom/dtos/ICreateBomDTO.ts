export default interface ICreateBomDTO {
  struct_code: string;
  main_component: string;
  description: string;
  alternative_component: string;
  id_production_order?: number;
  qty_used: number;
  position_mec?: string
}
