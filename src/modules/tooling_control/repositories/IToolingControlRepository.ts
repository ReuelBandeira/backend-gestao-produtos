import { Product } from 'puppeteer';
import ICreateToolingControlDTO, {
  ToolingControlPagination,
} from '../dtos/ICreateToolingControlDTO';
import ToolingControl from '../infra/typeorm/entities/ToolingControl';

export default interface IToolingControlRepository {
  findById(id: number): Promise<ToolingControl | undefined>;
  findByIdStatus(id: number): Promise<ToolingControl[]>;
  findByToolingControlName(id: number): Promise<ToolingControl | undefined>;
  findByIdToolgroup(id_toolgroup: number): Promise<ToolingControl | undefined>;
  findByToolgroupBBName(
    description_tooling_control: string,
    id_product: number
  ): Promise<ToolingControl | undefined>;
  findByProductNameSearch(
    description_tooling_control: string,
    page: number
  ): Promise<(ToolingControlPagination | undefined)[] | undefined>;
  findAllProducts(
    page: number
  ): Promise<ToolingControlPagination | ToolingControl[]>;
  create(data: ICreateToolingControlDTO): Promise<ToolingControl>;
  update(id: number, description_tooling_control: string): Promise<void>;
  delete(id: number): Promise<void>;
  findByDescription(
    description_tooling_control: string
  ): Promise<ToolingControl | undefined>;
  findAllToolingControl(isStencil: boolean): Promise<ToolingControl[]>;

  updateStatusToolingControl(id: number): Promise<void>;

}
