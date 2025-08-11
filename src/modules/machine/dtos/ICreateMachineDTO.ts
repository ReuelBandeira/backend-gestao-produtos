export default interface ICreateMachineDTO {
  name: string;
  machine_code?: string;
  side: number;
  qty_slots: number;
  tray_module_position: string;
  customer_code: string;
  multilaser_code: string;
  alternative_component: string;
  feeder_code: string;
  thickness: string;
  feed_pitch: number;
  qty: number;
  side_product: string;
  struct_bom_code: string;

}
