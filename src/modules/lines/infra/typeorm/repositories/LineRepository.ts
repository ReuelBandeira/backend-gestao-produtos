import ICreateLineDTO, {
  LinePagination,
} from '@modules/lines/dtos/ICreateLineDTO';
import ILineRepository from '@modules/lines/repositories/ILineRepository';
import MachineRegisters from '@modules/machine_registers/infra/typeorm/entities/MachineRegisters';
import { getRepository, Like, Repository } from 'typeorm';
import Line from '../entities/Line';

const TOTAL_PER_PAGE = 11;

export default class LineRepository implements ILineRepository {
  private ormRepository: Repository<Line>;

  private ormMachineRegistersRepository: Repository<MachineRegisters>;

  constructor() {
    this.ormRepository = getRepository(Line);
    this.ormMachineRegistersRepository = getRepository(MachineRegisters);
  }

  public async findById(id: number): Promise<Line | undefined> {
    const findLines = await this.ormRepository.findOne({ id });

    return findLines;
  }

  public async findByLineName(line_name: string): Promise<Line | undefined> {
    const findLines = await this.ormRepository.findOne({
      where: { line_name },
      withDeleted: true,
    });

    return findLines;
  }

  public async findByLineNameSearch(
    line_name: string,
  ): Promise<(Line | undefined)[] | undefined> {
    const findLines = await this.ormRepository.find({
      where: { line_name: Like(`${line_name}%`) },
      take: TOTAL_PER_PAGE,
    });

    return findLines;
  }

  public async findAllLines(page = 1): Promise<LinePagination> {
    const line = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalLines = (await this.ormRepository.find()).length;

    return {
      line,
      totalLines,
      totalPages: totalLines / TOTAL_PER_PAGE,
    };
  }

  public async findAllLinesWithoutPagination(): Promise<Line[]> {
    const lines = await this.ormRepository.find();

    return lines;
  }

  public async create({
    description,
    line_name,
  }: ICreateLineDTO): Promise<Line> {
    const line = this.ormRepository.create({
      description,
      line_name,
    });

    await this.ormRepository.save(line);

    return line;
  }

  public async update(line: Line): Promise<Line> {
    const update = await this.ormRepository.save(line);
    return update;
  }
// adcionado a função de listar linhas

  public async findAllLineList():Promise <Line[]> {
    const lines = await this.ormRepository.find({
      order:{id:'DESC'},
    });

    return  lines;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async listPositionsMachine():Promise <Line[]> {
    const lines = await this.ormRepository.find({
      order:{id:'DESC'},
    });

    return  lines;
  }

  async listPositions(
    id_line:number
  ): Promise<MachineRegisters [] | undefined> {

    const findSolder = await this.ormMachineRegistersRepository
      .createQueryBuilder('machine_registers')
      .select([
        'model',
        'serial_number',
        'line_layout',
        'id_line',
        'status'
      ])
      .where ({id_line,status:"ACTIVE"})
      .getRawMany();

    return findSolder;
  }

}
