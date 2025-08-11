import Cart from '@modules/cart/infra/typeorm/entities/Cart';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICartRepository from '../repositories/ICartRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Cart> {


    // const validation_delete = await this.cartRepository.deleteValidation(id);
//
    // if (validation_delete.length !==0) {
    //   throw new AppError(`Essa Ação não pode ser excluída,pois encontra-se em uso na Gestão de Downtime.`);
    // };


    const cart = await this.cartRepository.findById(id);

    if (!cart) {
      throw new AppError(`A ação com o id: ${id} não existe.`);
    }

    await this.cartRepository.delete(id);

    return cart;
  }
}
