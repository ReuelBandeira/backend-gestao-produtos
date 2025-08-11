import { CauseType } from "../infra/typeorm/entities/Cause";

export default interface ICreateCauseDTO {
  description: string;
  code:string;
  type: CauseType;
}
