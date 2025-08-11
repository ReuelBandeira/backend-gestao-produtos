import AppError from '@shared/errors/AppError';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';

import DeleteEmployeeService from './DeleteEmployeeService';

let fakeEmployeesRepository: FakeEmployeeRepository;

let deleteEmployee: DeleteEmployeeService;

describe('DeleteEmployee', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeeRepository();
    deleteEmployee = new DeleteEmployeeService(fakeEmployeesRepository);
  });

  it('should be able to delete the Employee', async () => {
    const createEmployee = await fakeEmployeesRepository.create({
      name: 'User Test delete',
      username: 'usertest',
      email: 'user.test@gmail.com',
      password: 'delete',
      role: 'testroledelete',
      departament: 'testdepartamentdelete',
    });

    const employee = await deleteEmployee.execute({
      username: createEmployee.username,
    });

    expect(employee.username).toBe('usertest');
  });

  it('should not be able delete an employee does not exist', async () => {
    const createEmployee = await fakeEmployeesRepository.create({
      name: 'User Test delete',
      username: 'usertest',
      email: 'user.test@gmail.com',
      password: 'delete',
      role: 'testroledelete',
      departament: 'testdepartamentdelete',
    });

    await expect(
      deleteEmployee.execute({
        username: 'usertest2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
