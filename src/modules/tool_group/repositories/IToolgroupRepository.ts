import ICreateToolgroupDTO, {
  ToolgroupPagination ,
} from '../dtos/ICreateToolgroupDTO';
import Toolgroup from '../infra/typeorm/entities/Toolgroup';

export default interface IToolgroupRepository {
  findById(id: number): Promise<Toolgroup | undefined>;
  findAllToolgroupListSelect(id: number): Promise<Toolgroup | undefined>;
  findByToolgroupName(toolgroup_name: string): Promise<Toolgroup | undefined>;
  findByToolgroupBName(toolgroup_name: string): Promise<Toolgroup | undefined>;
  findByToolgroupNameSearch(
    description_toolgroup: string,
    page:number,
  ): Promise<(ToolgroupPagination | undefined)[] | undefined>;
  findAllToolgroup(page: number): Promise<ToolgroupPagination | Toolgroup[]>;
  create(data: ICreateToolgroupDTO): Promise<Toolgroup>;
  update(
    id:number,
    toolgroup_name:string,
    description_toolgroup:string,
    isStencil: boolean
  ): Promise<void>;
  delete(id: number): Promise<void>;

}
