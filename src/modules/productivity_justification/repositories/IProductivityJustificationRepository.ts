import ICreateProductivityJustificationDTO, { IFindProductivityJustificationDTO } from "../dtos/ICreateProductivityJustificationDTO";
import ProductivityJustification from "../infra/typeorm/entities/ProductivityJustification";

export default interface IProductivityJustificationRepository {
  create(data: ICreateProductivityJustificationDTO): Promise<ProductivityJustification>;
  findByDate(data: IFindProductivityJustificationDTO): Promise<ProductivityJustification[]>
}
