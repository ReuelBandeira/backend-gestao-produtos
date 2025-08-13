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
export default class CreateFirstUserService {
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
    // Verifica se já existe algum usuário no sistema
    const existingEmployees = await this.employeesRepository.findAllEmployeesNotPaginate();
    if (existingEmployees.length > 0) {
      throw new AppError('Já existem usuários no sistema. Use a rota padrão com autenticação.', 403);
    }

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
