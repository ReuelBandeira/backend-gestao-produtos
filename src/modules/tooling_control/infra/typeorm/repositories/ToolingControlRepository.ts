import ICreateToolingControlDTO, {
  ToolingControlPagination,
} from '@modules/tooling_control/dtos/ICreateToolingControlDTO';
import IToolingControlRepository from '@modules/tooling_control/repositories/IToolingControlRepository';
import { getRepository, Like, Repository } from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';
import ToolGroup from '@modules/tool_group/infra/typeorm/entities/Toolgroup';
import ToolingControl from '../entities/ToolingControl';

const TOTAL_PER_PAGE = 11;

export default class ToolingControlRepository
  implements IToolingControlRepository
{
  private ormRepository: Repository<ToolingControl>;

  private ormRepositoryProduc: Repository<Product>;

  private ormRepositoryToolGroup: Repository<ToolGroup>;

  constructor() {
    this.ormRepository = getRepository(ToolingControl);
    this.ormRepositoryProduc = getRepository(Product);
    this.ormRepositoryToolGroup = getRepository(ToolGroup);
  }

  public async findAllToolingControl(
    isStencil: boolean
  ): Promise<ToolingControl[]> {
    return await this.ormRepository.find({
      where: {
        toolgroup: {
          isStencil,
        },
      },
      order: {
        description_tooling_control: 'ASC',
      },
      relations: ['toolgroup'],
    });
  }

  public async findByDescription(
    description_tooling_control: string
  ): Promise<ToolingControl | undefined> {
    return await this.ormRepository.findOne({
      where: {
        description_tooling_control,
        toolgroup: {
          isStencil: true,
        },
      },
      relations: ['toolgroup'],
    });
  }

  public async findById(id: number): Promise<ToolingControl | undefined> {
    const findTooling_control = await this.ormRepository.findOne({ id });

    return findTooling_control;
  }

  public async findByIdStatus(id: number): Promise<ToolingControl[]> {
    const findTooling_control = await this.ormRepository.find({ id, status: "online" });

    return findTooling_control;
  }

  public async findByToolingControlName(
    id: number
  ): Promise<ToolingControl | undefined> {
    const findTooling_control = await this.ormRepository.findOne({
      relations: ['product'],
      where: { id },
    });

    return findTooling_control;
  }

  public async findByIdToolgroup(
    id_toolgroup: number
  ): Promise<ToolingControl | undefined> {
    const findTooling_control = await this.ormRepository.findOne({
      where: { id_toolgroup },
    });

    return findTooling_control;
  }

  public async findByProductNameSearch(
    description_tooling_control: string,
    page = 1
  ): Promise<(ToolingControlPagination | undefined)[] | undefined> {
    const findTooling_control = await this.ormRepository.find({
      relations: ['product', 'toolgroup'],
      where: {
        description_tooling_control: Like(`%${description_tooling_control}%`),
      },
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalToolingControl = (
      await this.ormRepository.find({
        where: {
          description_tooling_control: Like(`%${description_tooling_control}%`),
        },
      })
    ).length;

    return {
      findTooling_control,
      totalPages: totalToolingControl / TOTAL_PER_PAGE,
      totalToolingControl,
    };
  }

  public async findAllToolingControlFilter(
    page = 1,
    id_product: number,
    description_tooling_control: string
  ): Promise<ToolingControlPagination> {
    if (
      id_product &&
      description_tooling_control &&
      description_tooling_control != 'undefined'
    ) {
      const toolingControl = await this.ormRepository.find({
        where: { id_product, description_tooling_control },
        relations: ['product', 'toolgroup'],
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
      });

      const totalToolingControl = (
        await this.ormRepository.find({
          where: { id_product, description_tooling_control },
        })
      ).length;

      return {
        toolingControl,
        totalToolingControl,
        totalPages: totalToolingControl / TOTAL_PER_PAGE,
      };
    }
    if (id_product) {
      const toolingControl = await this.ormRepository.find({
        relations: ['product', 'toolgroup'],
        where: { id_product },
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
      });

      const totalToolingControl = (
        await this.ormRepository.find({
          where: { id_product },
        })
      ).length;

      return {
        toolingControl,
        totalToolingControl,
        totalPages: totalToolingControl / TOTAL_PER_PAGE,
      };
    }

    if (description_tooling_control) {
      const toolingControl = await this.ormRepository.find({
        relations: ['product', 'toolgroup'],
        where: { description_tooling_control },
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
      });
      const totalToolingControl = (
        await this.ormRepository.find({
          where: { description_tooling_control },
        })
      ).length;

      return {
        toolingControl,
        totalToolingControl,
        totalPages: totalToolingControl / TOTAL_PER_PAGE,
      };
    }
  }

  public async create({
    id_toolgroup,
    id_product,
    description_tooling_control,
    amount_used,
    usage_limit,
  }: ICreateToolingControlDTO): Promise<ToolingControl> {
    const toolingControl = this.ormRepository.create({
      id_toolgroup,
      id_product,
      description_tooling_control,
      amount_used,
      usage_limit,
    });

    await this.ormRepository.save(toolingControl);

    return toolingControl;
  }

  public async update(
    id: number,
    description_tooling_control: string
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(ToolingControl)
      .set({ description_tooling_control })
      .where({ id })
      .execute();
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findByToolgroupBBName(
    description_tooling_control: string,
    id_product: number
  ): Promise<ToolingControl | undefined> {
    const findToolgroup = await this.ormRepository.findOne({
      where: {
        description_tooling_control,
        id_product,
      },
    });

    return findToolgroup;
  }

  public async findAllProducts(page = 1): Promise<ToolingControlPagination> {
    const toolingControl = await this.ormRepository.find({
      relations: ['product', 'toolgroup'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalToolingControl = (await this.ormRepository.find()).length;

    return {
      toolingControl,
      totalToolingControl,
      totalPages: totalToolingControl / TOTAL_PER_PAGE,
    };
  }

  public async findAllToolingControlList(page = 1): Promise<ToolingControl[]> {
    const tooling_control = await this.ormRepository.find({
      order: { id: 'DESC' },
      relations: ['product', 'toolgroup'],
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    return tooling_control;
  }

  public async verifyProductDouble(
    id_product: number
  ): Promise<Product | undefined> {
    const type_side = 'DOUBLE';
    const checkProductDouble = await this.ormRepositoryProduc
      .createQueryBuilder('product')
      .select(['id', 'type_side'])
      .where('id = :id_product', { id_product })
      .andWhere('type_side = :type_side', { type_side })
      .getRawOne();
    return checkProductDouble;
  }

  public async verifyToolgroupNameStencil(
    id_toolgroup: number
  ): Promise<ToolGroup | undefined> {
    const toolgroup_name = 'STENCIL';
    const checkToolgroupStencil = await this.ormRepositoryToolGroup
      .createQueryBuilder('toolgroup')
      .select(['id', 'toolgroup_name'])
      .where('id = :id_toolgroup', { id_toolgroup })
      .andWhere('toolgroup_name = :toolgroup_name', { toolgroup_name })
      .getRawOne();
    return checkToolgroupStencil;
  }


  async updateStatusToolingControl(
    id: number,
  ): Promise<void> {
    await this.ormRepository
    .createQueryBuilder('tooling_control')
    .update(ToolingControl)
    .set({status: "available"})
    .where({id})
    .execute()
  }

}
