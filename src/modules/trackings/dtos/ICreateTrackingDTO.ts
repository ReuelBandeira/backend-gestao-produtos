export default interface ICreateTrackingDTO {
  serial_number: string;
  mo_number: string;
  model_name: string;
  serial_raspberry: string;
  serial_dad: string;

  in_station_time?: Date;
  in_line_time?: Date;
  out_line_time?: Date;

  id_line: number;
  id_work_station: number;
  id_next_workgroup: number;
  id_employee: number;
}

export interface TrackingRoot {
  tracking_id: number
  tracking_serial_number: string
  tracking_mo_number: string
  tracking_model_name: string
  tracking_out_line_time: string
  tracking_id_line: number
  product_id: number
  product_product_name: string
  product_description: string
  target_id: number
  target_target: number
  line_line_name: string
}
