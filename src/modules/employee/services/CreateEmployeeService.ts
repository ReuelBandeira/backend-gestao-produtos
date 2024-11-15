import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import AppError from '@shared/errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/employee/providers/HashProvider/models/IHashProvider';
// eslint-disable-next-line import/no-extraneous-dependencies
import { validate } from 'class-validator';
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class CreateEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeesRepository: IEmployeeRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    role,
    departament,
  }: IRequest): Promise<Employee> {
    const employee = new Employee();
    employee.name = name;
    employee.username = username;
    employee.email = email;
    employee.password = password;
    employee.role = role;
    employee.departament = departament;

    // Validação da entidade
    const errors = await validate(employee);
    if (errors.length > 0) {
      // Formate os erros para uma mensagem compreensível
      const errorMessages = errors
        .map((err) => {
          // Use o operador de coalescência nula para garantir que constraints não seja undefined
          const constraints = err.constraints || {};
          return Object.values(constraints);
        })
        .flat()
        .join(', ');

      throw new AppError(`Validation failed: ${errorMessages}`, 400);
    }

    // Verifica se o username já existe
    const checkUsernameExist = await this.employeesRepository.findByUsername(
      username
    );

    if (checkUsernameExist) {
      throw new AppError(`Esse usuário já existe`, 400);
    }

    // Gera a senha criptografada
    const hashedPassword = await this.hashProvider.generateHash(password);

    // Cria o novo employee
    const newEmployee = await this.employeesRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      departament,
    });

    return newEmployee;
  }
}
