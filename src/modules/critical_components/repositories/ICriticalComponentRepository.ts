import { ICriticalComponentDTO } from "../dtos/ICriticalComponentDTO";
import CriticalComponent from "../infra/typeorm/entities/CriticalComponent";

export interface CriticalComponentUpdate {
  component_old: string
  component_new: string
  component_description: string
  component_quantity: number
}

export interface ICriticalComponentRepository {
  create(data: ICriticalComponentDTO): Promise<void>
  update(data : CriticalComponentUpdate ): Promise<void>
  findComponent(component: string): Promise<CriticalComponent | undefined>
  findCriticals(id_line: number): Promise<CriticalComponent[]>
  updateListCriticals(list_codeAlt:string,list_code: string): Promise<void>
}
