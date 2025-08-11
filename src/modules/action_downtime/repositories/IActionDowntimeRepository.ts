import ICreateActionDTO from '../dtos/ICreateActionDTO';
import Action from '../infra/typeorm/entities/Action';

export default interface IActionDowntimeRepository {
  findById(id: number): Promise<Action | undefined>;
  findByNameSearch(
    descriptiom: string,
  ): Promise<(Action | undefined)[] | undefined>;
  findByName(descriptiom: string): Promise<Action | undefined>;
  findAllAction(): Promise<Action | Action[]>;

  create(data: ICreateActionDTO): Promise<Action>;
  update(action: Action): Promise<Action>;
  delete(id: number): Promise<void>;
  deleteValidation(id: number): Promise<Action[]| undefined>;
}
