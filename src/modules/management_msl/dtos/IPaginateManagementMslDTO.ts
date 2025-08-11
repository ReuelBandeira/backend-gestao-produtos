import ManagementMsl from '../infra/typeorm/entities/ManagementMsl';

export default interface IPaginateManagementMslDTO {
  managementMsl: ManagementMsl[];
  totalPages: number;
  totalManagementMsl: number;
}
