import ICreateProviderDTO, {
  ProviderPagination,
} from '@modules/solder_paste/dtos/ICreateProviderDTO';
import IProviderRepository from '@modules/solder_paste/repositories/IProviderRepository';
import { getRepository, Like, Repository } from 'typeorm';

import Provider from '../entities/Provider';

const TOTAL_PER_PAGE = 11;

export default class ProviderRepository implements IProviderRepository {
  private ormRepository: Repository<Provider>;

  constructor() {
    this.ormRepository = getRepository(Provider);
  }

  public async findById(id: number): Promise<Provider | undefined> {
    const findProvider = await this.ormRepository.findOne({ id });

    return findProvider;
  }

  public async updateDelete(
    id:number,
    acronym:string,
  ): Promise<void> {
    await this.ormRepository.createQueryBuilder()
      .update(Provider)
      .set({ acronym:`${acronym  }_${id}D`})
      .where({ id })
      .execute();
  }

  public async findByProviderName(
    provider_name: string,
  ): Promise<Provider | undefined> {
    const findProvider = await this.ormRepository.findOne({

      where: { provider_name },
    });

    return findProvider;
  }

  public async findByAcronymName(
    acronym: string,
  ): Promise<Provider | undefined> {
    const findProvider = await this.ormRepository.findOne({

      where: { acronym },
    });

    return findProvider;
  }

  public async findByProviderNameSearch(
    description_provider: string,
    page=1,
  ): Promise<(ProviderPagination | undefined)[] | undefined> {
    const findProvider = await this.ormRepository.find({

      where: { description_provider: Like(`%${description_provider}%`) },
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const  totalProvider = (await this.ormRepository.find({
      where: { description_provider: Like(`%${description_provider}%`)},
    })).length;

    return {
      findProvider,
      totalPages:totalProvider/ TOTAL_PER_PAGE,
      totalProvider,
    };


  }
  public async findAllProviderFilter(
    page = 1,
    id: number,
    description_provider: string
    ): Promise<ProviderPagination> {

      if(id && description_provider && description_provider !='undefined'){
      const provider = await this.ormRepository.find({
        where: {id, description_provider},
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
      });
      const totalProvider = (await this.ormRepository.find({
        where: {id, description_provider},
      })).length;

      return {
        provider,
        totalProvider,
        totalPages: totalProvider / TOTAL_PER_PAGE,
      };
    }else{
      if(id ){
        const provider = await this.ormRepository.find({
          where: {id},
          order: { id: 'DESC' },
          skip: (page - 1) * TOTAL_PER_PAGE,
          take: TOTAL_PER_PAGE,
        });
        const totalProvider = (await this.ormRepository.find({
          where: {id}
        })).length;

        return {
          provider,
          totalProvider,
          totalPages: totalProvider / TOTAL_PER_PAGE,
        };
      }else{
        if(description_provider ){
          const provider = await this.ormRepository.find({
            where: {description_provider},
            order: { id: 'DESC' },
            skip: (page - 1) * TOTAL_PER_PAGE,
            take: TOTAL_PER_PAGE,
          });
          const totalProvider = (await this.ormRepository.find({
            where: {description_provider}
          })).length;

          return {
            provider,
            totalProvider,
            totalPages: totalProvider / TOTAL_PER_PAGE,
          };
        }
      }
    }
  }



  public async create({
    provider_name,
    description_provider,
    type_paste,
    acronym,
    protocol,
    turns_on


  }: ICreateProviderDTO): Promise<Provider> {
    const provider = this.ormRepository.create({
      provider_name,
      description_provider,
      type_paste,
      acronym,
      protocol,
      turns_on
    });

    await this.ormRepository.save(provider);

    return provider;
  }


  public async update(
    id:number,
    provider_name: string,
    description_provider:string,
    type_paste:any,
    acronym:string,
    protocol:string,
    turns_on:string

  ): Promise<void> {
    await this.ormRepository.createQueryBuilder()
      .update(Provider)
      .set({ provider_name,description_provider,type_paste, acronym,protocol,turns_on})
      .where({ id })
      .execute();
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }


  public async findAllProvider(page = 1): Promise<ProviderPagination> {
    const provider = await this.ormRepository.find({

      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalProvider = (await this.ormRepository.find()).length;

    return {
      provider,
      totalProvider,
      totalPages: totalProvider / TOTAL_PER_PAGE,
    };
  }

  public async findAllProviderList():Promise <Provider[]> {
    const provider = await this.ormRepository.find({
      order:{id:'DESC'},

    });

    return  provider;
  }

  public async findAllProviderListSelect(
    id:number,
  ):Promise <Provider[]> {
    const provider = await this.ormRepository.find({
      where: {id, },
    });

    return  provider;
  }

}
