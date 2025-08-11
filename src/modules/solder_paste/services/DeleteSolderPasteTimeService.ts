import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ISolderPasteTimeRepository from '../repositories/ISolderPasteTimeRepository';


interface IRequest {
  id: number;

}

@injectable()
export default class DeleteSolderPasteTimeService {
  constructor(
    @inject('SolderPasteTimeRepository')
    private solderPasteTimeRepository: ISolderPasteTimeRepository,

  ) {}

  async execute({ id }: IRequest): Promise<void> {



    const verifyTimesolderPaste = await this.solderPasteTimeRepository.findById(id);

    if (!verifyTimesolderPaste) {
      throw new AppError(`Esse id não existe.`);
    }

    await this.solderPasteTimeRepository.delete(id);
  }

}
