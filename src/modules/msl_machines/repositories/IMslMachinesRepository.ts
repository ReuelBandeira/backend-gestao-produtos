import ICreateMslMachinesDTO from '../dtos/ICreateMslMachinesDTO';
import MslMachines from '../infra/typeorm/entities/MslMachines';

export default interface IMslMachinesRepository {
  findById(id: number): Promise<MslMachines | undefined>;
  findByNameSearch(
    machine: string
  ): Promise<(MslMachines | undefined)[] | undefined>;
  findByName(machine: string): Promise<MslMachines | undefined>;
  findByMachine(machine: string): Promise<MslMachines | undefined>;
  findAllMslMachines(): Promise<MslMachines | MslMachines[]>;

  create(data: ICreateMslMachinesDTO): Promise<MslMachines>;
  update(action: MslMachines): Promise<MslMachines>;
  delete(id: number): Promise<void>;
}
