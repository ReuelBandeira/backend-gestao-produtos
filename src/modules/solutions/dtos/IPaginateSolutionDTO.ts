import Solution from '../infra/typeorm/entities/Solution';

export default interface IPaginateSolutionDTO {
  solutions: Solution[];
  totalPages: number;
  totalSolutions: number;
}
