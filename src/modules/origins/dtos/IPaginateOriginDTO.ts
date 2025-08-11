import Origin from '../infra/typeorm/entities/Origin';

export default interface IPaginateOriginDTO {
  origins: Origin[];
  totalPages: number;
  totalOrigins: number;
}
