import ICreateSolutionDTO from '@modules/solutions/dtos/ICreateSolutionDTO';
import CreateSolutionService from '@modules/solutions/services/CreateSolutionService';
import DeleteSolutionService from '@modules/solutions/services/DeleteSolutionService';
import UpdateSolutionService from '@modules/solutions/services/UpdateSolutionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SolutionRepository from '../../typeorm/repositories/SolutionRepository';

export default class SolutionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateSolutionDTO;

    const createSolution = container.resolve(CreateSolutionService);

    const solution = await createSolution.execute(data);

    return response.status(201).json(solution);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const solutionRepository = new SolutionRepository();

    const { page } = request.query;

    const { solutions, totalPages, totalSolutions } =
      await solutionRepository.findAllSolutions(Number(page));

    return response.status(200).json({
      solutions,
      totalPages,
      totalSolutions,
    });
  }

  public async indexCodes(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const solutionRepository = new SolutionRepository();

    const solutions = await solutionRepository.findAllSolutionsNotPaginate();

    return response.status(200).json(solutions);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { code } = request.query;

    const solutionRepository = new SolutionRepository();

    const solution = await solutionRepository.findBySearch(String(code));

    return response.status(200).json(solution);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description } = request.body;

    const updateSolution = container.resolve(UpdateSolutionService);

    const solution = await updateSolution.execute({
      id: Number(id),
      description,
    });

    return response.status(200).json(solution);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSolution = container.resolve(DeleteSolutionService);

    await deleteSolution.execute(Number(id));

    return response.status(200).json();
  }
}
