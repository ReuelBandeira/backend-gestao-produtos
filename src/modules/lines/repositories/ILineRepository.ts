import ICreateLineDTO, { LinePagination } from '../dtos/ICreateLineDTO';
import Line from '../infra/typeorm/entities/Line';

export default interface ILineRepository {
  findById(id: number): Promise<Line | undefined>;
  findByLineName(Line_name: string): Promise<Line | undefined>;
  findByLineNameSearch(
    line_name: string,
  ): Promise<(Line | undefined)[] | undefined>;
  findAllLines(page: number): Promise<LinePagination>;
  findAllLinesWithoutPagination(): Promise<Line[]>;
  create(data: ICreateLineDTO): Promise<Line>;
  update(line: Line): Promise<Line>;
  delete(id: number): Promise<void>;
}
