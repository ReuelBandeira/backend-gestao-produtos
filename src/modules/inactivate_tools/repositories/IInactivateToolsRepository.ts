import ICreateInactivateToolsDTO, {
    InactivateToolsPagination,
  } from '../dtos/ICreateInactivateToolsDTO';
   import InactivateTools from '../infra/typeorm/entities/InactivateTools';
   import ToolingControl from "@modules/tooling_control/infra/typeorm/entities/ToolingControl";
  
  export default interface IInactivateToolsRepository {
    findByIdToolingControlInactive(id: number): Promise<ToolingControl | undefined>;
    findByIdToolingControl(id: number): Promise<void>;
    findByInactivateToolsSearch( reason_tool_inactivation: string,  page:number): Promise<(InactivateToolsPagination | undefined)[] | undefined>;
    findById(id: number): Promise<InactivateTools | undefined>;
    findAllInactivateTools(page: number): Promise<InactivateToolsPagination | InactivateTools[]>;
    findByToolingControlName(id: number): Promise<InactivateTools | undefined>;
    create(data: ICreateInactivateToolsDTO): Promise<InactivateTools>;
    update( id:number, id_tooling_control: number, reason_tool_inactivation:string ): Promise<void>;
    delete(id: number): Promise<void>;
  }
  