import Scrap from '../infra/typeorm/entities/Scrap';

export default interface IPaginateScrapDTO {
  scraps: Scrap[];
  totalPages: number;
  totalScraps: number;
}
