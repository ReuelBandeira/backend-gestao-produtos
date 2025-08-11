import Type from '@modules/type_downtime/infra/typeorm/entities/Type';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ITypeRepository from '../repositories/ITypeRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteTypeService {
  constructor(
    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Type> {


    const validation_delete = await this.typeRepository.deleteValidation(id);

    if (validation_delete.length !==0) {
      throw new AppError(`Esse Tipo não pode ser excluída,pois encontra-se em uso na Gestão de Downtime.`);
    };


    const type = await this.typeRepository.findById(id);

    if (!type) {
      throw new AppError(`O tipo de parada com o id: ${id} não existe.`);
    };

    await this.typeRepository.delete(id);

    return type;
  }
}
