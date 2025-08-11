export default interface ICreateMslMovementDTO {
  component: string;
  serial: string;
  start_date: Date;
  movement_type: string;
  total_time_open?: number;
  id_machine: number;
  id_employee: number;
}
