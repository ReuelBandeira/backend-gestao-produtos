/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateEmployeeService from '@modules/employee/services/CreateEmployeeService';
import DeleteEmployeeService from '@modules/employee/services/DeleteEmployeeService';
import UpdateEmployeeService from '@modules/employee/services/UpdateEmployeeService';
import AppError from '@shared/errors/AppError';
import EmployeesRepository from '../../typeorm/repositories/EmployeeRepository';

export default class EmployeesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, role, departament } = request.body;

    const createEmployee = container.resolve(CreateEmployeeService);

    const employee = await createEmployee.execute({
      name,
      username,
      email,
      password,
      role,
      departament,
    });

    // @ts-expect-error
    delete employee.password;

    return response.status(201).json(employee);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const employeeRepository = new EmployeesRepository();

    const { employees, totalPages, totalEmployees } =
      await employeeRepository.findAllEmployees(p);

    const employeesWithouPassword = employees.map((item) => {
      return { ...item, password: undefined };
    });

    return response.json({
      employees: employeesWithouPassword,
      totalPages,
      totalEmployees,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const employeeRepository = new EmployeesRepository();

    const employees = await employeeRepository.findByName(String(name));

    if (!employees) {
      throw new AppError('This employee does not exist', 404);
    }

    const employeesWithouPassword = employees.map((item) => {
      return { ...item, password: undefined };
    });
    return response.json({ employees: [...employeesWithouPassword] });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { name, email, password, role, departament } = request.body;

    const updateEmployee = container.resolve(UpdateEmployeeService);

    const employee = await updateEmployee.execute({
      name,
      username,
      email,
      password,
      role,
      departament,
    });

    // @ts-expect-error
    delete employee.password;

    return response.status(201).json(employee);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const deleteEmployee = container.resolve(DeleteEmployeeService);

    await deleteEmployee.execute({ username });

    return response.status(204).json({});
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const employeeRepository = new EmployeesRepository();

    const employees = await employeeRepository.findAllEmployeesNotPaginate();

    const employeesWithouPassword = employees.map((item) => {
      return { ...item, password: undefined };
    });

    return response.json(employeesWithouPassword);
  }
}
