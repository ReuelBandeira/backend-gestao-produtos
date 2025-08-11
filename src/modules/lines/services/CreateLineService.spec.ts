import AppError from '@shared/errors/AppError';
import FakeLineRepository from '../repositories/fakes/FakeLineRepositroy';
import CreateLineService from './CreateLineService';

let fakeLineRepository: FakeLineRepository;

let createLine: CreateLineService;

describe('Lines', () => {
  beforeEach(() => {
    fakeLineRepository = new FakeLineRepository();
    createLine = new CreateLineService(fakeLineRepository);
  });

  it('should be create a new Line', async () => {
    const line = await createLine.execute({
      line_name: 'SMT001',
      description: 'Line of the SMD',
    });

    expect(line.line_name).toBe('SMT001');
  });

  it('the program does not should be create a Line with the same Line name', async () => {
    const line = await fakeLineRepository.create({
      line_name: 'SMT001',
      description: 'Line of the SMD',
    });

    await expect(
      createLine.execute({
        line_name: line.line_name,
        description: 'Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
