import ICreateSnCompositionDTO from "../dtos/ICreateSnCompositionDTO";
import SnComposition from "../infra/typeorm/entities/SnComposition";

export default interface ISnCompositionRepository {
  findById(id: number): Promise<SnComposition | undefined>;
  findByProduct(id_product: number): Promise<SnComposition | undefined>

  findBySearch(product: string): Promise<SnComposition[]>;
  findAllSnCompositionsNotPaginate(): Promise<SnComposition[]>;

  create(data: ICreateSnCompositionDTO): Promise<SnComposition>;
  delete(id: number): Promise<void>;
}
