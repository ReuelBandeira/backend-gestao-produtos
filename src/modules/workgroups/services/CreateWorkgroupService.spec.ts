import AppError from '@shared/errors/AppError';
import FakeWorkgroupRepository from '../repositories/fakes/FakeWorkgroupRepository';
import CreateWorkgroupService from './CreateWorkgroupService';

let fakeEmployeesRepository: FakeWorkgroupRepository;

let createWorkgroup: CreateWorkgroupService;

describe('CreateWorkgroup', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeWorkgroupRepository();

    createWorkgroup = new CreateWorkgroupService(fakeEmployeesRepository);
  });

  it('should be able to create a new Workgroup', async () => {
    const employee = await createWorkgroup.execute({
      name: 'Group Test',
    });

    expect(employee).toHaveProperty('id');
    expect(employee.name).toBe('Group Test');
  });

  it('should not be able create two employee with same name', async () => {
    const create = await fakeEmployeesRepository.create({
      name: 'Group Test',
    });

    await expect(
      createWorkgroup.execute({
        name: create.name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
