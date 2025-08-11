import FakeWorkStationRepository from '@modules/workstations/repositories/fakes/FakeWorkStationRepository';
import AppError from '@shared/errors/AppError';
import FakeWorkgroupRepository from '../repositories/fakes/FakeWorkgroupRepository';
import UpdateWorkgroupService from './UpdateWorkgroupService';

let fakeWorkgroupsRepository: FakeWorkgroupRepository;
let fakeWorkstationRepository: FakeWorkStationRepository;

let updateWorkgroup: UpdateWorkgroupService;

describe('UpdateWorkgroup', () => {
  beforeEach(() => {
    fakeWorkgroupsRepository = new FakeWorkgroupRepository();
    fakeWorkstationRepository = new FakeWorkStationRepository();
    updateWorkgroup = new UpdateWorkgroupService(fakeWorkgroupsRepository);
  });

  it('should be able to update the Employee', async () => {
    const createWorkgroup = await fakeWorkgroupsRepository.create({
      name: 'Group Test',
    });

    const workgroup = await updateWorkgroup.execute({
      id: createWorkgroup.id,
      name: 'Group test update',
    });

    expect(workgroup.name).toBe('Group test update');
    expect(workgroup.workstations).toBeInstanceOf(Array);
  });

  it('should be able to update the Workgroup with your workstations', async () => {
    const createWorkgroup = await fakeWorkgroupsRepository.create({
      name: 'Group Test',
    });

    const createWorkStation = await fakeWorkstationRepository.create({
      name: `${createWorkgroup.name}_01`,
      workgroup_id: createWorkgroup.id,
    });

    await fakeWorkgroupsRepository.update({
      ...createWorkgroup,
      workstations: [createWorkStation],
    });

    const workgroup = await updateWorkgroup.execute({
      id: createWorkgroup.id,
      name: 'Group test update',
    });

    expect(workgroup.name).toBe('Group test update');
    expect(workgroup.workstations).toBeInstanceOf(Array);
  });

  it('should not be able update an Workgroup does not exist', async () => {
    const createWorkgroup = await fakeWorkgroupsRepository.create({
      name: 'Group Test',
    });

    await expect(
      updateWorkgroup.execute({
        id: 90,
        name: 'Group test update',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
