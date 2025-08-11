export interface ICriticalComponentDTO {
  component: string;
  component_description: string;
  component_quantity: number;
  component_quantity_bom: number;
  usage_percentage?: number;
  used_quantity: number;
  kit_quantity?: number;
  list_code: string;
  id_line?: number;
  machine: string;
  module: string;
  side: string;
  position: number;
}

