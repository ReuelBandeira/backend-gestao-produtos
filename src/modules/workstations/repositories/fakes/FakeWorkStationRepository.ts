import ICreateWorkStationDTO from '@modules/workstations/dtos/ICreateWorkStationDTO';
import WorkStation from '@modules/workstations/infra/typeorm/entities/WorkStation';
import IWorkStationRepository from '../IWorkStationRepository';

export default class FakeWorkStationRepository
  implements IWorkStationRepository {
  private workStations: WorkStation[] = [];

  public async findAll(): Promise<WorkStation[]> {
    return this.workStations;
  }

  public async findById(id: number): Promise<WorkStation | undefined> {
    const workStation = this.workStations.find((item) => item.id === id);

    return workStation;
  }

  public async findByName(name: string): Promise<WorkStation | undefined> {
    const workStation = this.workStations.find((item) => item.name === name);

    return workStation;
  }

  public async create({
    name,
    workgroup_id,
  }: ICreateWorkStationDTO): Promise<WorkStation> {
    const workStation = new WorkStation();

    Object.assign(workStation, {
      name,
      id: Math.round(Math.random() * 10),
      workgroup_id,
    });

    this.workStations.push(workStation);

    return workStation;
  }

  public async delete(id: number): Promise<void> {
    const findIndex = this.workStations.findIndex(
      (workstation) => workstation.id === id,
    );

    this.workStations.splice(findIndex, 1);
  }
}
