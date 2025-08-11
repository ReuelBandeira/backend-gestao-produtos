import ICreateLineDTO, {
  LinePagination,
} from '@modules/lines/dtos/ICreateLineDTO';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import AppError from '@shared/errors/AppError';
import ILineRepository from '../ILineRepository';

export default class FakeLineRepository implements ILineRepository {
  private lines: Line[] = [];

  public async findById(id: number): Promise<Line | undefined> {
    const findLine = await this.lines.find((line) => line.id === id);

    return findLine;
  }

  public async findByLineName(line_name: string): Promise<Line | undefined> {
    const findLine = this.lines.find((line) => line.line_name === line_name);

    return findLine;
  }

  public async findByLineNameSearch(
    line_name: string,
  ): Promise<(Line | undefined)[] | undefined> {
    throw new AppError('Method not implemented.');
  }

  public async findAllLines(page: number): Promise<LinePagination> {
    return {
      line: this.lines,
      totalLines: 1,
      totalPages: 1,
    };
  }

  public async findAllLinesWithoutPagination(): Promise<Line[]> {
    return this.lines;
  }

  public async create({
    line_name,
    description,
  }: ICreateLineDTO): Promise<Line> {
    const line = new Line();

    Object.assign(line, {
      id: Math.round(Math.random() * 10),
      line_name,
      description,
    });

    this.lines.push(line);

    return line;
  }

  public async update(line: Line): Promise<Line> {
    const findByIndex = this.lines.findIndex(
      (findLine) => findLine.id === line.id,
    );

    this.lines[findByIndex] = line;

    return line;
  }

  public async delete(id: number): Promise<void> {
    const findByIndex = this.lines.findIndex((findLine) => findLine.id === id);

    this.lines.splice(findByIndex, 1);
  }
}
