import { ActionType } from "../infra/typeorm/entities/Action";

export default interface ICreateActionDTO {
  description: string;
  code:string;
  type: ActionType;
}

// comentario git
