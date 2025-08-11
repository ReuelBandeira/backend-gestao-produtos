import AppError from '@shared/errors/AppError';
import FakeWorkgroupRepository from '../repositories/fakes/FakeWorkgroupRepository';
import DeleteWorkgroupeeService from './DeleteWorkgroupService';

let fakeWorkgroupRepository: FakeWorkgroupRepository;

let deleteWorkgroups: DeleteWorkgroupeeService;

describe('DeleteWorkgroup', () => {
  beforeEach(() => {
    fakeWorkgroupRepository = new FakeWorkgroupRepository();
    deleteWorkgroups = new DeleteWorkgroupeeService(fakeWorkgroupRepository);
  });

  it('should be able to delete the Employee', async () => {
    const deleteWorkgroup = await fakeWorkgroupRepository.create({
      name: 'Group Test',
    });

    const workgroup = await deleteWorkgroups.execute({
      id: deleteWorkgroup.id,
    });

    expect(workgroup.name).toBe('Group Test');
  });

  it('should not be able delete a workgroup that does not exist', async () => {
    await expect(
      deleteWorkgroups.execute({
        id: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
