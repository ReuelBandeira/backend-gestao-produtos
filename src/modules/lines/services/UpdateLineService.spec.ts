import AppError from '@shared/errors/AppError';
import FakeLineRepository from '../repositories/fakes/FakeLineRepositroy';
import UpdateLineService from './UpdateLineService';

let fakeLineRepository: FakeLineRepository;

let updateLine: UpdateLineService;

describe('Update Line', () => {
  beforeEach(() => {
    fakeLineRepository = new FakeLineRepository();
    updateLine = new UpdateLineService(fakeLineRepository);
  });

  it('should be able create a new Line', async () => {
    const line = await fakeLineRepository.create({
      line_name: 'SMT001',
      description: 'Updated test',
    });

    const upated = await updateLine.execute({
      id: line.id,
      line_name: line.line_name,
      description: 'Update',
    });

    expect(upated.line_name).toBe('SMT001');
  });

  it('should be not able create Line that does not exist', async () => {
    await fakeLineRepository.create({
      line_name: 'SMT001',
      description: 'Updated test',
    });

    await expect(
      updateLine.execute({
        id: 17328,
        line_name: 'SMT001',
        description: 'Update',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
