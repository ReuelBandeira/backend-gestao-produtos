import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/employee/providers/HashProvider/fakes/FakeHashProvider';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import AuthenticateEmployeeService from './AuthenticateEmployeeService';
import CreateEmployeeService from './CreateEmployeeService';

let fakeEmployeeRepository: FakeEmployeeRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateEmployeeService;
let createUser: CreateEmployeeService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeEmployeeRepository = new FakeEmployeeRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateEmployeeService(
      fakeEmployeeRepository,
      fakeHashProvider,
    );
    createUser = new CreateEmployeeService(
      fakeEmployeeRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await createUser.execute({
      name: 'John Doe',
      username: 'jd123',
      departament: 'bla',
      role: 'bla',
      email: 'jd@gmail.com',
      password: '123456',
    });
    const response = await authenticateUser.execute({
      username: 'jd123',
      password: '123456',
    });
    expect(generateHash).toHaveBeenCalled();

  });
  it('should not be able to authenticate with no existing user through username', async () => {
    await expect(
      authenticateUser.execute({
        username: 'in-existing-username',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      username: 'jd',
      departament: 'bla',
      role: 'bla',
      email: 'jd@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        username: 'jd',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
