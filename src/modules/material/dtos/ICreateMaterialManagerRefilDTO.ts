export default interface ICreateMaterialManagerRefilDTO {
  list_code: string;
  machine: string;
  module: string;
  side: number;
  position: number;
  component_old: string;
  component_new: string;
  id_employee: number;
  sequential_old: string;
  qr_code_information_old: string;
  sequential_new: string;
  qr_code_information_new: string;
  component_quantity: number;
}
