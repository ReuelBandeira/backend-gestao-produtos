
export default interface IDowntimeCheckinControlDTO {
  id_downtime: number;
  zone_type: string;
  id_employee_checkin: number;
  status: string;
  date_accompanying_checkin: string;
  type: string;
}
