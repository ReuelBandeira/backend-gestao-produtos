import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import AppError from '@shared/errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

interface IRequest {
  username: string;
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class DeleteEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeesRepository: IEmployeeRepository
  ) {}

  async execute({ username }: IRequest): Promise<Employee> {
    const employee = await this.employeesRepository.findByUsername(username);

    if (!employee) {
      throw new AppError(`Esse username: ${username} não existe`);
    }

    await this.employeesRepository.delete(username);

    return employee;
  }
}
