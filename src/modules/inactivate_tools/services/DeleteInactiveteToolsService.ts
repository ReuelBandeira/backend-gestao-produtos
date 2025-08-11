import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IInactivateToolsRepository from '../repositories/IInactivateToolsRepository';


interface IRequest {
  id: number;

}

@injectable()
export default class DeleteInactiveteToolsService {
  constructor(
    @inject('InactivateToolsRepository')
    private inactivateToolsRepository: IInactivateToolsRepository,

  ) { }

  async execute({ id }: IRequest): Promise<void> {
    const product = await this.inactivateToolsRepository.findById(id);


    if (!product) {
      throw new AppError(`Não existe ferramenta inativa com esse código, favor verificar!`);
    }

    await this.inactivateToolsRepository.delete(id);
  }



}


