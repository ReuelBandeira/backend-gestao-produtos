import ICreateTargetDTO from '../dtos/ICreateTargetDTO';
import IPaginateTargetDTO from '../dtos/IPaginateTargetDTO';
import Target from '../infra/typeorm/entities/Target';

export default interface ITargetRepository {
  findById(id: number): Promise<Target | undefined>;
  findByProductAndLine(
    id_line: number,
    id_product: number
  ): Promise<Target | undefined>;
  findBySearch(product: string): Promise<Target[]>;
  findAllTargets(page: number): Promise<IPaginateTargetDTO>;
  findAllTargetsNotPaginate(): Promise<Target[]>;

  create(data: ICreateTargetDTO): Promise<Target>;
  update(solution: Target): Promise<Target>;
  delete(id: number): Promise<void>;
}
