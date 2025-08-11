import { DefectType } from "../infra/typeorm/entities/Defect";

export default interface ICreateDefectDTO {
  description: string;
  code:string;
  type: DefectType;
}
