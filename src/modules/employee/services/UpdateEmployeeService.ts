import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IEmployeeRepository from '../repositories/IEmployeeRepository';
import IHashProvider from '@modules/employee/providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  departament: string;
}

@injectable()
export default class UpdateEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeesRepository: IEmployeeRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    role,
    departament,
  }: IRequest): Promise<Employee> {
    const employee = await this.employeesRepository.findByUsername(username);

    if (!employee) {
      throw new AppError(`Esse username: ${username} não existe`);
    }

    if (typeof password != 'undefined'){
      const hashedPassword = await this.hashProvider.generateHash(password);
      Object.assign(employee, {
        name,
        email,
        password: hashedPassword,
        role,
        departament,
      });
    }else{
      Object.assign(employee, {
        name,
        email,
        role,
        departament,
      });
    }


    await this.employeesRepository.update(employee);

    return employee;
  }
}
