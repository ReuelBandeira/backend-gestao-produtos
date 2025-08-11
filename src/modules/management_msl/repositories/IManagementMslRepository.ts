import ICreateManagementMslDTO from '../dtos/ICreateManagementMslDTO';
import IPaginateManagementMslDTO from '../dtos/IPaginateManagementMslDTO';
import ManagementMsl from '../infra/typeorm/entities/ManagementMsl';

export default interface IManagementMslRepository {
  findById(id: number): Promise<ManagementMsl | undefined>;
  findByComponent(component: string): Promise<ManagementMsl | undefined>;

  findBySearch(component: string): Promise<ManagementMsl[]>;
  findAllManagementMsl(page: number): Promise<IPaginateManagementMslDTO>;
  findAllManagementMslNotPaginate(): Promise<ManagementMsl[]>;

  create(data: ICreateManagementMslDTO): Promise<ManagementMsl>;
  update(managementMsl: ManagementMsl): Promise<ManagementMsl>;
  delete(id: number): Promise<void>;

  findByCompMslManagement(
    component: string
  ): Promise<ManagementMsl[] | undefined>;

  filterComponentsPaginate(page: number): Promise<IPaginateManagementMslDTO>;

  verifyMslComponents(): Promise<ManagementMsl[] | undefined>;
}
