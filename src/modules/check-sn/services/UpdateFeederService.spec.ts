import AppError from '@shared/errors/AppError';
import FakeFeederRepository from '../repositories/fakes/FakeFeederRepository';
import UpdateFeederService from './UpdateFeederService';

let fakeFeederRepository: FakeFeederRepository;

let updateFeeder: UpdateFeederService;

describe('Update Line', () => {
  beforeEach(() => {
    fakeFeederRepository = new FakeFeederRepository();
    updateFeeder = new UpdateFeederService(fakeFeederRepository);
  });

  it('should be able create a new Line', async () => {
    const feeder = await fakeFeederRepository.create({
      feeder_code: 'SMT001',
      mouting_limit: 100,
      id_type_feeder: 1,
    });

    const upated = await updateFeeder.execute({
      feeder_code: feeder.feeder_code,
      mouting_limit: 200,
      id_type_feeder: 2,
    });

    expect(upated.feeder_code).toBe('SMT001');
  });

  it('should be not able create Line that does not exist', async () => {
    await fakeFeederRepository.create({
      feeder_code: 'SMT001',
      mouting_limit: 100,
      id_type_feeder: 1,
    });

    await expect(
      updateFeeder.execute({
        feeder_code: 'SMT002',
        mouting_limit: 100,
        id_type_feeder: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
