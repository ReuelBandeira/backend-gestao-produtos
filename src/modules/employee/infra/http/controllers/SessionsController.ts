/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateEmployeeService from '@modules/employee/services/AuthenticateEmployeeService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const authenticateEmployee = container.resolve(AuthenticateEmployeeService);

    const { employee, token } = await authenticateEmployee.execute({
      username,
      password,
    });
    // @ts-expect-error
    delete employee.password;
    return res.status(201).json({ employee, token , message: "Login realizado com sucesso"  });
  }
}
