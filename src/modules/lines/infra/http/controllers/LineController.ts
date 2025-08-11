/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateLineService from '@modules/lines/services/CreateLineService';
import UpdateLineService from '@modules/lines/services/UpdateLineService';
import DeleteLineService from '@modules/lines/services/DeleteProductService';
import LineRepository from '../../typeorm/repositories/LineRepository';

export default class LineController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { line_name, description } = request.body;

    const createLine = container.resolve(CreateLineService);

    const line = await createLine.execute({
      line_name,
      description,
    });

    return response.status(201).json(line);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page, all } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const lineRepository = new LineRepository();

    if (all) {
      const lines = await lineRepository.findAllLinesWithoutPagination();

      return response.json(lines);
    }

    const {
      line: lines,
      totalPages,
      totalLines,
    } = await lineRepository.findAllLines(p);

    return response.json({
      lines,
      totalPages,
      totalLines,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { line_name } = request.query;

    const lineRepository = new LineRepository();

    const lines = await lineRepository.findByLineNameSearch(String(line_name));

    if (!lines) {
      throw new AppError('This line does not exist', 404);
    }

    return response.json(lines);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { line_name, description } = request.body;

    const idParsed = Number(id);
    const updateline = container.resolve(UpdateLineService);

    const line = await updateline.execute({
      id: idParsed,
      line_name,
      description,
    });

    return response.status(201).json(line);
  }
    /////adcionado a função de listar as linhas

  public async listLine(request: Request, response: Response): Promise<Response> {
    const lineRepository = new LineRepository();

    const lines = await lineRepository.findAllLineList();

    return response.json({
      lines

    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLine = container.resolve(DeleteLineService);
    const idParsed = Number(id);

    await deleteLine.execute({ id: idParsed });

    return response.status(204).json({});
  }

  public async listLinePositions(request: Request, response: Response): Promise<Response> {
    const lineRepository = new LineRepository();

    const lines_positions = await lineRepository.listPositionsMachine();

    const report_lines_positions=[];

    for(let i = 0; i < lines_positions.length; i++){
      const id_line=lines_positions[i].id;

      const report= lines_positions[i];



      // eslint-disable-next-line no-await-in-loop
      const registers_lines= await lineRepository.listPositions(id_line);

      let lines_registers={...
        report,
        registers_lines,

      };

      report_lines_positions.push(lines_registers);

    }


    return response.json({
      lines_positions:report_lines_positions
    });
  }


}
