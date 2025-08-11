import ICreateBomDTO from '../dtos/ICreateBomDTO';
import { Bom } from '../infra/typeorm/entities/Bom';

export default interface IBomRepository {
  findById(id: number): Promise<Bom | undefined>;
  findByStructCode(struct_code: string): Promise<Bom[] | undefined>;
  create(data: ICreateBomDTO[]): Promise<Bom[]>;
  updateStatus(status: 'Y' | 'N', partnumber: string): Promise<void>;
  findByComponentAlternative(
    main_component: string
  ): Promise<Bom[] | undefined>;
  findByComponentAlternativeComponent(
    status: string,
    struct_code: string,
    main_component: string
  ): Promise<Bom[] | undefined>;
  deleteOp(mo_code: string): Promise<Bom[] | undefined>;

  findByMainComponentOrAlternativeComponent(
    component: string
  ): Promise<Bom | undefined>;

  findAllMainComponents(component: string): Promise<Bom[]>
}
