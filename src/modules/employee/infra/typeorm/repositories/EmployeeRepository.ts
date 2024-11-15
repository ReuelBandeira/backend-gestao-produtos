import ICreateEmployeeDTO from '@modules/employee/dtos/ICreateEmployeeDTO';
import IEmployeeRepository from '@modules/employee/repositories/IEmployeeRepository';
import { getRepository, Like, Repository } from 'typeorm';

import Employee from '../entities/Employee';

interface EmployeePagination {
  employees: Employee[];
  totalEmployees: number;
  totalPages: number;
}

const TOTAL_PER_PAGE = 11;

export default class EmployeesRepository implements IEmployeeRepository {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  public async findAllEmployeesNotPaginate(): Promise<Employee[]> {
    return await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  public async findById(id: number): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne(id);

    return employee;
  }

  public async findByUsername(username: string): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne({ where: { username } });

    return employee;
  }

  public async findByName(
    name: string
  ): Promise<(Employee | undefined)[] | undefined> {
    const employees = await this.ormRepository.find({
      where: { name: Like(`${name}%`) },
      take: 11,
      order: { id: 'DESC' },
    });

    return employees;
  }

  public async create(employeeData: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.ormRepository.create(employeeData);
    await this.ormRepository.save(employee);

    return employee;
  }

  public async update(employeeData: Employee): Promise<Employee> {
    const employee = await this.ormRepository.save(employeeData);
    return employee;
  }

  public async findAllEmployees(page = 1): Promise<EmployeePagination> {
    // ? skip = offset, take = limit
    const employees = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });
    const totalEmployees = (await this.ormRepository.find()).length;

    return {
      employees,
      totalEmployees,
      totalPages: totalEmployees / TOTAL_PER_PAGE,
    };
  }

  public async delete(username: string): Promise<void> {
    await this.ormRepository.delete({ username });
  }
}
