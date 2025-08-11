import AppError from '@shared/errors/AppError';
import FakeLineRepository from '../repositories/fakes/FakeLineRepositroy';
import DeleteLineService from './DeleteProductService';

let fakeLineRepository: FakeLineRepository;

let deleteLine: DeleteLineService;

describe('Tests to Delete Line', () => {
  beforeEach(() => {
    fakeLineRepository = new FakeLineRepository();
    deleteLine = new DeleteLineService(fakeLineRepository);
  });

  it('This program should be able delete a Line', async () => {
    const { id } = await fakeLineRepository.create({
      line_name: 'SMT001',
      description: 'Test',
    });

    const deleteLineFunc = jest.spyOn(fakeLineRepository, 'delete');

    await deleteLine.execute({ id });

    expect(deleteLineFunc).toBeCalled();
  });

  it('Reject when the Line name does not exist', async () => {
    await fakeLineRepository.create({
      line_name: 'SMT001',
      description: 'Test',
    });

    await expect(deleteLine.execute({ id: 2781 })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
