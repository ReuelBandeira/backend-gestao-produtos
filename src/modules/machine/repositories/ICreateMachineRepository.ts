import ICreateMachineDTO from '../dtos/ICreateMachineDTO';
import { Machine } from '../infra/typeorm/entities/Machine';

export default interface IMachineRepository {

  findByStructCode(
    struct_code: string,
    side_product: string,
  ): Promise<Machine[] | undefined>;
  create(data: ICreateMachineDTO[]): Promise<Machine[]>;
  updateStatus(
    status: string,
    struct_bom_code: string,
    side_product: string,
  ): Promise<void>;
}
