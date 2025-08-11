export default interface ICreateQualityHead {
  list_code: string;
  machine: string;
  module: string;
  side: number;
  status: 'online' | 'offline';
  id_employee: number;
}
