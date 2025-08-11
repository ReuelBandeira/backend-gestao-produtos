export default interface ICreateProductivityJustificationDTO {
  hour: string;
  day: string;
  planned: number;
  produced: number;
  los: number;
  justification: string;
  id_line: number;
  id_employee: number
  id_shift: number
}

export interface IFindProductivityJustificationDTO {
  day: string
  id_line: number
  id_shift: number
}
