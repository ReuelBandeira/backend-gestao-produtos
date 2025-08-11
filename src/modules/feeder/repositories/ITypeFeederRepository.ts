import { TypeFeeder } from '../infra/typeorm/entities/TypeFeeder';

export interface ITypeFeederRepository {
  findAllTypeFeeder(): Promise<TypeFeeder[] | undefined>;
}
