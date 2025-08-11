import ICreateWorkGroupDTO from '@modules/workgroups/dtos/ICreateWorkGroupDTO';
import Workgroup from '@modules/workgroups/infra/typeorm/entities/Workgroup';
import IWorkgroupRepository from '../IWorkgroupRepository';

export default class FakeWorkgroupRepository implements IWorkgroupRepository {
  private workgroups: Workgroup[] = [];

  public async findByName(name: string): Promise<Workgroup | undefined> {
    const findWorkgroup = this.workgroups.find(
      (workgroup) => workgroup.name === name,
    );

    return findWorkgroup;
  }

  findByNameSearch(
    name: string,
  ): Promise<(Workgroup | undefined)[] | undefined> {
    throw new Error('Method not implemented.');
  }

  public async create({ name }: ICreateWorkGroupDTO): Promise<Workgroup> {
    const workgroup = new Workgroup();

    Object.assign(workgroup, {
      id: Math.round(Math.random() * 10),
      name,
    });
    this.workgroups.push(workgroup);
    return workgroup;
  }

  public async update(workgroup: Workgroup): Promise<Workgroup> {
    const findIndex = this.workgroups.findIndex(
      (findWorkgroup) => findWorkgroup.id === workgroup.id,
    );

    this.workgroups[findIndex] = workgroup;

    return workgroup;
  }

  public async findById(id: number): Promise<Workgroup | undefined> {
    const findWorkgroup = this.workgroups.find(
      (workgroup) => workgroup.id === id,
    );

    return findWorkgroup;
  }

  public async findAllWorkgroups(): Promise<Workgroup[]> {
    return this.workgroups;
  }

  public async listWorkGroups(): Promise<Workgroup[]> {
    return this.workgroups;
  }

  public async delete(id: number): Promise<void> {
    const findWorkgroupIndex = this.workgroups.findIndex(
      (workgroup) => workgroup.id === id,
    );

    this.workgroups.splice(findWorkgroupIndex, 1);
  }
}
