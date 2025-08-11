import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/employee/providers/HashProvider/fakes/FakeHashProvider';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';

import UpdateEmployeeService from './UpdateEmployeeService';

let fakeEmployeesRepository: FakeEmployeeRepository;
let fakeHashProvider: FakeHashProvider;

let updateEmployee: UpdateEmployeeService;

describe('UpdateEmployee', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeeRepository();
    fakeHashProvider = new FakeHashProvider();
    updateEmployee = new UpdateEmployeeService(fakeEmployeesRepository);
  });

  it('should be able to update the Employee', async () => {
    const createEmployee = await fakeEmployeesRepository.create({
      name: 'User Test update',
      username: 'usertest',
      email: 'user.test@gmail.com',
      password: 'update',
      role: 'testroleupdate',
      departament: 'testdepartamentupdate',
    });

    const employee = await updateEmployee.execute({
      name: 'User Test update',
      username: createEmployee.username,
      password: 'update',
      email: 'user.test@gmail.com',
      role: 'testroleupdate',
      departament: 'testdepartamentupdate',
    });

    expect(employee.username).toBe('usertest');
  });

  it('should not be able update an employee does not exist', async () => {
    const createEmployee = await fakeEmployeesRepository.create({
      name: 'User Test update',
      username: 'usertest',
      email: 'user.test@gmail.com',
      password: 'update',
      role: 'testroleupdate',
      departament: 'testdepartamentupdate',
    });



    await expect(
      updateEmployee.execute({
        name: 'User Test',
        username: 'usertest2',
        email: 'user.test@gmail.com',
        password: '123456',
        role: 'testrole',
        departament: 'testdepartament',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
