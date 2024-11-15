import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';
import Employee from '../infra/typeorm/entities/Employee';

interface EmployeePagination {
  employees: Employee[];
  totalEmployees: number;
  totalPages: number;
}

export default interface IEmployeeRepository {
  findById(id: number): Promise<Employee | undefined>;
  findByUsername(username: string): Promise<Employee | undefined>;
  findByName(name: string): Promise<(Employee | undefined)[] | undefined>;
  findAllEmployees(page: number): Promise<EmployeePagination | Employee[]>;
  findAllEmployeesNotPaginate(): Promise<Employee[]>;
  create(data: ICreateEmployeeDTO): Promise<Employee>;
  update(employee: Employee): Promise<Employee>;
  delete(username: string): Promise<void>;
}
