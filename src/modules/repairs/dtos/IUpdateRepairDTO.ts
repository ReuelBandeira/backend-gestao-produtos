export interface IUpdateRepairDTO {
  id: number;
  id_cause: number;
  id_solution: number;
  id_origin: number;
  id_technical: number;
  id_repairman: number;
  mechanical_position_repairman: string;
  observation: string;
  date_repair: Date
}
