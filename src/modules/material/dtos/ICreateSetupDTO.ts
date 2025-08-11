export default interface ICreateSetupDTO {
  id_line: number;
  list_code: string;
  machine: string;
  module: string;
  side: number;
  position: number;
  id_feeder: number;
  component: string;
  id_employee: number;
  sequential: string;
  qr_code_information: string;
  component_quantity: number;
  feeder_pitch: number;
}
