import Provider from '../infra/typeorm/entities/Provider';

export default interface ICreateProviderDTO {
  provider_name: string;
  description_provider: string;
  type_paste: string;
  acronym:string;
  protocol:string;
  turns_on:string;
}
export interface ProviderPagination {
  provider: Provider[];
  totalProvider: number;
  totalPages: number;
  acronym:string;
  protocol:string;
  turns_on:string;
}
