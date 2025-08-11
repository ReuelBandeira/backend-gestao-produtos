import ICreateOvenDTO from '../dtos/ICreateOvenDTO';
import Oven from '../infra/typeorm/entities/Oven';

export default interface IOvenRepository {
  findById(id: number): Promise<Oven | undefined>;
  findByNameSearch(
    descriptiom: string,
  ): Promise<(Oven | undefined)[] | undefined>;
  findByName(description: string): Promise<Oven | undefined>;
  findAllOven(): Promise<Oven | Oven[]>;

  create(data: ICreateOvenDTO): Promise<Oven>;
  // eslint-disable-next-line no-shadow
  update(oven: Oven): Promise<Oven>;
  delete(id: number): Promise<void>;

}
