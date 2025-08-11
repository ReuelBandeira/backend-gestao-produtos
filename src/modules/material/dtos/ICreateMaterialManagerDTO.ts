import { MaterialManager } from '../infra/typeorm/entities/MaterialManager';

export interface ICreateMaterialManagerDTO {
  list_code: string;
  main_components: string;
  alternative_components: string;
  struct_code: string;
  side: number;
  side_product: string;
  machine: string;
  tray_module_position: string;
  status: string;
  status_component: string;
  module: string;
  position: number;
  quantity: number;
  id_employee: number;
  version: number;
  feeder_pitch: number;
  width: string;
  url: string;
  qtyTop?: number;
  qtyBot?: number;


}

export interface IMaterialPagination {
  materials: MaterialManager[];
  totalMaterials: number;
  totalPages: number;
}
