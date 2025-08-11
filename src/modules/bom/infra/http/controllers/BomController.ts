/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateBomService from '@modules/bom/services/CreateBomService';
import BomRepository from '../../typeorm/repositories/BomRepository';

export default class BomController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createBom = container.resolve(CreateBomService);

    const bom = await createBom.execute({
      filename: request.file.filename,
    });

    return response.status(201).json(bom);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { struct_code } = request.params;
    const bomRepository = new BomRepository();

    const bom = await bomRepository.findByBomToPo(struct_code);

    return response.json(bom);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { struct_code } = request.query;

    const bomRepository = new BomRepository();

    const bom = await bomRepository.findByStructCode(String(struct_code));

    if (!bom) {
      throw new AppError('This BOM does not exist or none are active', 404);
    }

    return response.json(bom);
  }
}
