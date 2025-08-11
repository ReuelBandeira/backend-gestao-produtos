import ICreateModelDTO from '../dtos/ICreateModelDTO';
import Model from '../infra/typeorm/entities/Model';

export default interface IModelRepository {
  findById(id: number): Promise<Model | undefined>;
  findByNameSearch(
    model: string,
  ): Promise<(Model | undefined)[] | undefined>;
  findByName(model: string , type:string): Promise<Model | undefined>;
  findAllModel(): Promise<Model | Model[]>;

  create(data: ICreateModelDTO): Promise<Model>;
  update(model: Model): Promise<Model>;
  delete(id: number): Promise<void>;

}
