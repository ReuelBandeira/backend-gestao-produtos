import ICreateProviderDTO, {
  ProviderPagination ,
} from '../dtos/ICreateProviderDTO';
import Provider from '../infra/typeorm/entities/Provider';

export default interface IProviderRepository {
  findById(id: number): Promise<Provider | undefined>;
  updateDelete(
    id:number,
    acronym:string,
  ): Promise<void>;
  findAllProviderListSelect(id: number): Promise<Provider | undefined>;
  findByProviderName(provider_name: string): Promise<Provider | undefined>;
  findByAcronymName(acronym: string): Promise<Provider | undefined>;
  findByProviderNameSearch(
    description_provider: string,
    page:number,
  ): Promise<(ProviderPagination | undefined)[] | undefined>;
  findAllProvider(page: number): Promise<ProviderPagination | Provider[]>;
  create(data: ICreateProviderDTO): Promise<Provider>;
  update(
    id:number,
    provider_name:string,
    description_provider:string,
    type_paste:string,
    acronym:string,
    protocol:string,
    turns_on:string,

): Promise<void>;
  delete(id: number): Promise<void>;


}
