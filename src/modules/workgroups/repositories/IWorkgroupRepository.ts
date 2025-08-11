import ICreateWorkGroupDTO from '../dtos/ICreateWorkGroupDTO';
import Workgroup from '../infra/typeorm/entities/Workgroup';

export default interface IWorkgroupRepository {
  findById(id: number): Promise<Workgroup | undefined>;
  findByNameSearch(
    name: string,
  ): Promise<(Workgroup | undefined)[] | undefined>;
  findByName(name: string): Promise<Workgroup | undefined>;
  findAllWorkgroups(): Promise<Workgroup | Workgroup[]>;

  listgroups(): Promise<Workgroup | Workgroup[]>;
  create(data: ICreateWorkGroupDTO): Promise<Workgroup>;
  update(workgroup: Workgroup): Promise<Workgroup>;
  delete(id: number): Promise<void>;
}
