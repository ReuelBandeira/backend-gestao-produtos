import ICreateWorkStationDTO from '@modules/workstations/dtos/ICreateWorkStationDTO';
import IWorkStationRepository from '@modules/workstations/repositories/IWorkStationRepository';
import { getRepository, Repository } from 'typeorm';
import WorkStation from '../entities/WorkStation';

export default class WorkStationRepository implements IWorkStationRepository {
  private ormRepository: Repository<WorkStation>;

  constructor() {
    this.ormRepository = getRepository(WorkStation);
  }

  public async findAll(): Promise<WorkStation[]> {
    const workStations = await this.ormRepository.find();

    return workStations;
  }

  public async findById(id: number): Promise<WorkStation | undefined> {
    const workStation = await this.ormRepository.findOne({ where: { id } });

    return workStation;
  }

  public async findByName(name: string): Promise<WorkStation | undefined> {
    const workStation = await this.ormRepository.findOne(name);
    return workStation;
  }

  public async create(data: ICreateWorkStationDTO): Promise<WorkStation> {
    const workStation = this.ormRepository.create(data);

    await this.ormRepository.save(workStation);

    return workStation;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async findAllWorkStationsWorkgroup(
    workgroup_id: number
  ): Promise<WorkStation[]> {
    const workStations = await this.ormRepository.find({
      where: { workgroup_id },
      order: {
        name: 'DESC',
      },
    });
    return workStations;
  }
}
