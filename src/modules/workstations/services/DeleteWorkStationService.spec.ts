import AppError from '@shared/errors/AppError';
import FakeWorkStationRepository from '../repositories/fakes/FakeWorkStationRepository';
import DeleteWorkStationService from './DeleteWorkStationService';
import CreateWorkStationService from './CreateWorkStationService';

let workStationRepository: FakeWorkStationRepository;
let createWorkStation: CreateWorkStationService;
let deleteWorkStation: DeleteWorkStationService;

describe('DeleteWorkStationService', () => {
  beforeEach(() => {
    workStationRepository = new FakeWorkStationRepository();

    createWorkStation = new CreateWorkStationService(workStationRepository);
    deleteWorkStation = new DeleteWorkStationService(workStationRepository);
  });

  it('should be able to delete a workstation by id', async () => {
    const { id } = await createWorkStation.execute({
      name: 'T0001',
      workgroup_id: 1,
    });
    const deleteWorkStationFunc = jest.spyOn(workStationRepository, 'delete');

    await deleteWorkStation.execute({ id });

    expect(deleteWorkStationFunc).toHaveBeenCalled();
  });

  it('should not be able to delete a workstation not existing id', async () => {
    const id = 0;

    await await expect(
      deleteWorkStation.execute({ id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
