import ICreateToolgroupDTO, {
  ToolgroupPagination,
} from '@modules/tool_group/dtos/ICreateToolgroupDTO';
import IToolgroupRepository from '@modules/tool_group/repositories/IToolgroupRepository';
import { getRepository, Like, Repository } from 'typeorm';

import Toolgroup from '../entities/Toolgroup';

const TOTAL_PER_PAGE = 11;

export default class ToolgroupRepository implements IToolgroupRepository {
  private ormRepository: Repository<Toolgroup>;

  constructor() {
    this.ormRepository = getRepository(Toolgroup);
  }

  public async findById(id: number): Promise<Toolgroup | undefined> {
    const findToolgroup = await this.ormRepository.findOne({ id });

    return findToolgroup;
  }

  public async findByToolgroupName(
    toolgroup_name: string,
  ): Promise<Toolgroup | undefined> {
    const findToolgroup = await this.ormRepository.findOne({

      where: { toolgroup_name },
    });

    return findToolgroup;
  }

  public async findByToolgroupBName(
    toolgroup_name: string,
  ): Promise<Toolgroup | undefined> {
    const findToolgroup = await this.ormRepository.findOne({

      where: { toolgroup_name },
    });

    return findToolgroup;
  }

  public async findByToolgroupNameSearch(
    description_toolgroup: string,
    page=1,
  ): Promise<(ToolgroupPagination | undefined)[] | undefined> {
    const findToolgroup = await this.ormRepository.find({
      where: { description_toolgroup: Like(`%${description_toolgroup}%`) },
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const  totalToolgroup = (await this.ormRepository.find({
      where: { description_toolgroup: Like(`%${description_toolgroup}%`)},
    })).length;

    return {
      findToolgroup,
      totalPages:totalToolgroup/ TOTAL_PER_PAGE,
      totalToolgroup,
    };


  }

  public async findAllToolgroupFilter(
    page = 1,
    id: number,
    description_toolgroup: string
    ): Promise<ToolgroupPagination> {

      if(id && description_toolgroup && description_toolgroup !='undefined'){
      const toolgroup = await this.ormRepository.find({
        where: {id, description_toolgroup},
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
      });
      const totalToolgroup = (await this.ormRepository.find({
        where: {id, description_toolgroup},
      })).length;

      return {
        toolgroup,
        totalToolgroup,
        totalPages: totalToolgroup / TOTAL_PER_PAGE,
      };
    }
      if(id ){
        const toolgroup = await this.ormRepository.find({
          where: {id},
          order: { id: 'DESC' },
          skip: (page - 1) * TOTAL_PER_PAGE,
          take: TOTAL_PER_PAGE,
        });
        const totalToolgroup = (await this.ormRepository.find({
          where: {id}
        })).length;

        return {
          toolgroup,
          totalToolgroup,
          totalPages: totalToolgroup / TOTAL_PER_PAGE,
        };
      }
        if(description_toolgroup ){
          const toolgroup = await this.ormRepository.find({
            where: {description_toolgroup},
            order: { id: 'DESC' },
            skip: (page - 1) * TOTAL_PER_PAGE,
            take: TOTAL_PER_PAGE,
          });
          const totalToolgroup = (await this.ormRepository.find({
            where: {description_toolgroup}
          })).length;

          return {
            toolgroup,
            totalToolgroup,
            totalPages: totalToolgroup / TOTAL_PER_PAGE,
          };
        }


  }

  public async create({
    toolgroup_name,
    description_toolgroup,
    isStencil
  }: ICreateToolgroupDTO): Promise<Toolgroup> {
    const toolgroup = this.ormRepository.create({
      toolgroup_name,
      description_toolgroup,
      isStencil
    });

    await this.ormRepository.save(toolgroup);

    return toolgroup;
  }


  public async update(
    id:number,
    toolgroup_name: string,
    description_toolgroup:string,
    isStencil: boolean
  ): Promise<void> {
    await this.ormRepository.createQueryBuilder()
      .update(Toolgroup)
      .set({ toolgroup_name, description_toolgroup, isStencil })
      .where({ id })
      .execute();
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }


  public async findAllToolgroup(page = 1): Promise<ToolgroupPagination> {
    const toolgroup = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalToolgroup = (await this.ormRepository.find()).length;

    return {
      toolgroup,
      totalToolgroup,
      totalPages: totalToolgroup / TOTAL_PER_PAGE,
    };
  }

  public async findAllToolgroupList():Promise <Toolgroup[]> {
    const toolgroup = await this.ormRepository.find({
      order:{id:'DESC'},

    });

    return toolgroup;
  }

  public async findAllToolgroupListSelect(
    id:number,

  ):Promise <Toolgroup[]> {
    const toolgroup = await this.ormRepository.find({
      where: {id, },

    });

    return  toolgroup;
  }

}
