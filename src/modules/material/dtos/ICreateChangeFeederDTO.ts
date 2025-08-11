export default interface ICreateChangeFeederDTO {
  list_code: string;
  machine: string;
  module: string;
  side: number;
  position: number;
  id_feeder_old: number;
  id_feeder_new: number;
  id_employee: number;
}
