import ICreateSolutionDTO from '../dtos/ICreateSolutionDTO';
import IPaginateSolutionDTO from '../dtos/IPaginateSolutionDTO';
import Solution from '../infra/typeorm/entities/Solution';

export default interface ISolutionRepository {
  findById(id: number): Promise<Solution | undefined>;
  findBySearch(code: string): Promise<Solution[]>;
  findByCode(code: string): Promise<Solution | undefined>;
  findAllSolutions(page: number): Promise<IPaginateSolutionDTO>;
  findAllSolutionsNotPaginate(): Promise<Solution[]>;

  create(data: ICreateSolutionDTO): Promise<Solution>;
  update(solution: Solution): Promise<Solution>;
  delete(id: number): Promise<void>;
}
