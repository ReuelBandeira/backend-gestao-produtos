import AppError from '@shared/errors/AppError';
import FakeFeederRepository from '../repositories/fakes/FakeFeederRepository';
import { CreateFeederService } from './CreateFeederService';

let fakeFeederRepository: FakeFeederRepository;

let createFeeder: CreateFeederService;

describe('Feeders', () => {
  beforeEach(() => {
    fakeFeederRepository = new FakeFeederRepository();
    createFeeder = new CreateFeederService(fakeFeederRepository);
  });

  it('should be create a new Feeder', async () => {
    const feeder = await createFeeder.execute({
      feeder_code: 'SMT001',
      mouting_limit: 100,
      id_type_feeder: 1,
    });

    expect(feeder.feeder_code).toBe('SMT001');
  });

  it('the program does not should be create a Feeder with the same Feeder name', async () => {
    const feeder = await fakeFeederRepository.create({
      feeder_code: 'SMT001',
      mouting_limit: 100,
      id_type_feeder: 1,
    });

    await expect(
      createFeeder.execute({
        feeder_code: feeder.feeder_code,
        mouting_limit: 100,
        id_type_feeder: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
