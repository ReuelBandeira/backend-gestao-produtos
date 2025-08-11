import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/employee/providers/HashProvider/fakes/FakeHashProvider';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';

import CreateEmployeeService from './CreateEmployeeService';

let fakeEmployeesRepository: FakeEmployeeRepository;
let fakeHashProvider: FakeHashProvider;

let createEmployee: CreateEmployeeService;

describe('CreateEmployee', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeeRepository();
    fakeHashProvider = new FakeHashProvider();

    createEmployee = new CreateEmployeeService(
      fakeEmployeesRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new Employee', async () => {
    const employee = await createEmployee.execute({
      name: 'User Test',
      username: 'usertest',
      email: 'user.test@gmail.com',
      password: '123456',
      role: 'testrole',
      departament: 'testdepartament',
    });

    expect(employee).toHaveProperty('id');
    expect(employee.username).toBe('usertest');
  });

  it('should not be  able create two employee with same username', async () => {
    const employee = await fakeEmployeesRepository.create({
      name: 'User Test delete',
      username: 'usertest',
      email: 'user.test@gmail.com',
      password: 'delete',
      role: 'testroledelete',
      departament: 'testdepartamentdelete',
    });

    await expect(
      createEmployee.execute({
        name: 'User Test',
        username: employee.username,
        email: 'user.test@gmail.com',
        password: '123456',
        role: 'testrole',
        departament: 'testdepartament',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
