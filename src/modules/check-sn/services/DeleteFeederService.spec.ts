import AppError from '@shared/errors/AppError';
import FakeFeederRepository from '../repositories/fakes/FakeFeederRepository';
import DeleteFeederService from './DeleteFeederService';

let fakeFeederRepository: FakeFeederRepository;

let deleteFeeder: DeleteFeederService;

describe('Tests to Delete Feeder', () => {
  beforeEach(() => {
    fakeFeederRepository = new FakeFeederRepository();
    deleteFeeder = new DeleteFeederService(fakeFeederRepository);
  });

  it('This program should be able delete a feeder', async () => {
    const { id } = await fakeFeederRepository.create({
      feeder_code: 'SMT001',
      mouting_limit: 100,
      id_type_feeder: 1,
    });

    const deleteFeederFunc = jest.spyOn(fakeFeederRepository, 'delete');

    await deleteFeeder.execute({ id });

    expect(deleteFeederFunc).toBeCalled();
  });

  it('Reject when the Feeder name does not exist', async () => {
    await fakeFeederRepository.create({
      feeder_code: 'SMT001',
      mouting_limit: 100,
      id_type_feeder: 1,
    });

    await expect(deleteFeeder.execute({ id: 2781 })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
