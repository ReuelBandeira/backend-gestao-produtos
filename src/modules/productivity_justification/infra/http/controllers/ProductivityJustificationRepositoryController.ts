

import ICreateProductivityJustificationDTO from '@modules/productivity_justification/dtos/ICreateProductivityJustificationDTO';
import CreateProductivityJustificationService from '@modules/productivity_justification/services/CreateProductivityJustificationService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductivityJustificationRepository from '../../typeorm/repositories/ProductivityJustificationRepository';

export default class ProductivityJustificationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateProductivityJustificationDTO;
    const { id: id_employee } = request.user;

    const createProductivityJustificationService = container.resolve(CreateProductivityJustificationService);

    const res = createProductivityJustificationService.execute({
      ...data,
      id_employee
    })

    return response.status(201).json(res);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { day, id_shift, id_line } = request.query

    const productivityJustificationRepository = new ProductivityJustificationRepository();

    const res = await productivityJustificationRepository.findByDate({
      day: String(day),
      id_shift: Number(id_shift),
      id_line: Number(id_line)
    });

    return response.status(200).json(res);
  }
}
