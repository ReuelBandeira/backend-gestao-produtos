import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/employee/providers/HashProvider/models/IHashProvider';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  departament: string;
}

@injectable()
export default class CreateEmployeeService {
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
    const checkUsernameExist = await this.employeesRepository.findByUsername(
      username,
    );

    if (checkUsernameExist) {
      throw new AppError(`Esse usuário já existe `);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const employee = await this.employeesRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      departament,
    });

    return employee;
  }
}
