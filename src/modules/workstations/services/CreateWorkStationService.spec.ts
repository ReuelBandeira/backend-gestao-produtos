import AppError from '@shared/errors/AppError';
import FakeWorkStationRepository from '../repositories/fakes/FakeWorkStationRepository';
import CreateWorkStationService from './CreateWorkStationService';

let workStationRepository: FakeWorkStationRepository;
let createWorkStation: CreateWorkStationService;

describe('CreateWorkStationService', () => {
  beforeEach(() => {
    workStationRepository = new FakeWorkStationRepository();

    createWorkStation = new CreateWorkStationService(workStationRepository);
  });

  it('should be able to create a workstation by name', async () => {
    const name = 'T001';
    const workgroup_id = 1;
    const workstation = await createWorkStation.execute({ name, workgroup_id });

    expect(workstation).toHaveProperty('id');
    expect(workstation.name).toBe(name);
  });
  it('should not be able to create a workstation with same name', async () => {
    const name = 'T001';
    const workgroup_id = 1;

    await createWorkStation.execute({ name, workgroup_id });

    await expect(
      createWorkStation.execute({ name, workgroup_id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
