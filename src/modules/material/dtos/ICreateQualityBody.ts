export default interface ICreateQualityBody {
  list_code: string;
  machine: string;
  side: number;
  module: string;
  position: number;
  component: string;
  id_quality_head: number;
  id_employee: number;
  qr_code_information: string;
}
