import ICreateEmployeeDTO from '@modules/employee/dtos/ICreateEmployeeDTO';
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import IEmployeeRepository from '../IEmployeeRepository';

export default class FakeEmployeeRepository implements IEmployeeRepository {
  private employees: Employee[] = [];

  public async findByUsername(username: string): Promise<Employee | undefined> {
    const findEmployee = this.employees.find(
      (employee) => employee.username === username,
    );

    return findEmployee;
  }

  public async findByName(
    name: string,
  ): Promise<(Employee | undefined)[] | undefined> {
    const findEmployee = this.employees.find(
      (employee) => employee.name === name,
    );

    return [findEmployee];
  }

  public async create({
    username,
    departament,
    email,
    name,
    password,
    role,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = new Employee();

    Object.assign(employee, {
      id: Math.round(Math.random() * 10),
      username,
      departament,
      email,
      name,
      password,
      role,
    });
    this.employees.push(employee);
    return employee;
  }

  public async update(employee: Employee): Promise<Employee> {
    const findIndex = this.employees.findIndex(
      (findEmployee) => findEmployee.id === employee.id,
    );

    this.employees[findIndex] = employee;

    return employee;
  }

  public async findById(id: number): Promise<Employee | undefined> {
    const findEmployee = this.employees.find((employee) => employee.id === id);

    return findEmployee;
  }

  public async findAllEmployees(page: number): Promise<Employee[]> {
    return this.employees;
  }

  public async delete(username: string): Promise<void> {
    const findEmployeeIndex = this.employees.findIndex(
      (employee) => employee.username === username,
    );

    this.employees.splice(findEmployeeIndex, 1);
  }
}
