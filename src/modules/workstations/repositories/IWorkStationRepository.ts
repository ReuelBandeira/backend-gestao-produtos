import ICreateWorkStationDTO from '../dtos/ICreateWorkStationDTO';
import WorkStation from '../infra/typeorm/entities/WorkStation';

export default interface IWorkStationRepository {
  findAll(): Promise<WorkStation[]>;
  findById(id: number): Promise<WorkStation | undefined>;
  findByName(name: string): Promise<WorkStation | undefined>;
  create(data: ICreateWorkStationDTO): Promise<WorkStation>;
  delete(id: number): Promise<void>;
  findAllWorkStationsWorkgroup(
    workgroup_id: number
  ): Promise<WorkStation[] | undefined>;
}
