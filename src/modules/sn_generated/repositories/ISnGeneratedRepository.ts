import ICreateSnGeneratedDTO from "../dtos/ICreateSnGeneratedDTO";
import SnGenerated from "../infra/typeorm/entities/SnGenerated";


export default interface ISnGeneratedRepository {
  findById(id: number): Promise<SnGenerated | undefined>;

  // findAllSnGeneratedsNotPaginate(): Promise<SnGenerated[]>;

  create(data: Omit<ICreateSnGeneratedDTO, "quantity_generate">[]): Promise<SnGenerated[]>;

  findLastInsetByDate(product: string): Promise<SnGenerated | undefined>

  findByProductionOrder(id_production_order: number): Promise<SnGenerated[]>
  countByProductionOrder(id_production_order: number): Promise<number>

}
