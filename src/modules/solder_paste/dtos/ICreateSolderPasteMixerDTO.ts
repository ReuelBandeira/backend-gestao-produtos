import Provider from '../infra/typeorm/entities/Provider';

export default interface ICreateSolderPasteMixerDTO {
  serial_paste: string;
  id_machine: number;
  input_date: Date;
  exit_date: Date;
  id_employee_input: number;
  id_employee_exit: number;
}
export interface SolderPasteMixerPagination {
  solderPaste: Provider[];
  totalSolderPaste: number;
  totalPages: number;
}
