import ICreateSolutionDTO from '@modules/solutions/dtos/ICreateSolutionDTO';
import IPaginateSolutionDTO from '@modules/solutions/dtos/IPaginateSolutionDTO';
import ISolutionRepository from '@modules/solutions/repositories/ISolutionRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Solution from '../entities/Solution';

const TOTAL_PER_PAGE = 11;

export default class SolutionRepository implements ISolutionRepository {
  private ormRepository: Repository<Solution>;

  constructor() {
    this.ormRepository = getRepository(Solution);
  }

  public async findAllSolutionsNotPaginate(): Promise<Solution[]> {
    return await this.ormRepository.find({
      order: {
        code: 'ASC',
      },
    });
  }

  public async findById(id: number): Promise<Solution | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findByCode(code: string): Promise<Solution | undefined> {
    return await this.ormRepository.findOne({
      where: { code },
    });
  }

  public async findBySearch(code: string): Promise<Solution[]> {
    return await this.ormRepository.find({
      where: { code },
      order: {
        id: 'DESC',
      },
    });
  }

  public async create(data: ICreateSolutionDTO): Promise<Solution> {
    const solution = this.ormRepository.create(data);
    await this.ormRepository.save(solution);

    return solution;
  }

  public async update(data: Solution): Promise<Solution> {
    return await this.ormRepository.save(data);
  }

  public async findAllSolutions(page = 1): Promise<IPaginateSolutionDTO> {
    const [solutions, totalSolutions] = await this.ormRepository.findAndCount({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    return {
      solutions,
      totalPages: totalSolutions / TOTAL_PER_PAGE,
      totalSolutions,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }
}
