import { CauseType } from "../infra/typeorm/entities/Cause";

export default interface ICreateCauseDTO {
  description: string;
  id_category_cause: number;
}
