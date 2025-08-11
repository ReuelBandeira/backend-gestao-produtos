import { ITypeFeederRepository } from '@modules/feeder/repositories/ITypeFeederRepository';
import { getRepository, Repository } from 'typeorm';
import { TypeFeeder } from '../entities/TypeFeeder';

export class TypeFeederRepository implements ITypeFeederRepository {
  private ormrepository: Repository<TypeFeeder>;

  constructor() {
    this.ormrepository = getRepository(TypeFeeder);
  }

  async findAllTypeFeeder(): Promise<TypeFeeder[] | undefined> {
    const typeFeeder = await this.ormrepository.find();

    return typeFeeder;
  }
}
