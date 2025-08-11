import ICreateMslMovementDTO from '../dtos/ICreateMslMovementDTO';
import MslMovement from '../infra/typeorm/entities/MslMovement';

export default interface IMslMovementRepository {
  findByComponentOpen(
    component: string,
    serial: string
  ): Promise<MslMovement | undefined>;
  create(data: ICreateMslMovementDTO): Promise<MslMovement>;

  findLimit(): Promise<MslMovement[]>;

  findByCompMslMovement(component: string): Promise<MslMovement[] | undefined>;
  findByComponent(component: string): Promise<MslMovement | undefined>;
}
