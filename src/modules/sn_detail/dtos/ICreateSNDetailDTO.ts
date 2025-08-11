export default interface ICreateSNDetailDTO {
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
  id_employee: number;
  solder_paste_serial: string;
  fase:number;
}
