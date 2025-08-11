import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import Departament from '@modules/employee/infra/typeorm/entities/Departament';

export default class DepartamentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const departamentRepository = getRepository(Departament);

    const departaments = await departamentRepository.find();

    return response.json(departaments);
  }
}
