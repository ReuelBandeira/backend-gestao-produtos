import ICheckToolPrinterRepository from '@modules/check_tool_printer/repositories/ICheckToolPrinterRepository';
import { createQueryBuilder, getRepository, Like, Repository } from 'typeorm';
import CheckToolPrinter from '../entities/CheckToolPrinter';

const TOTAL_PER_PAGE = 11;

export default class CheckToolPrinterRepository
  implements ICheckToolPrinterRepository {
  private ormRepository: Repository<CheckToolPrinter>;

  constructor() {
    this.ormRepository = getRepository(CheckToolPrinter);
  }

  public async findByListCode(list_code: string): Promise<CheckToolPrinter | undefined> {
    return await this.ormRepository.findOne({
      relations: ["line"],
      where: {
        list_code,
      }
    })
  }

  public async findByProductionOrder(
    id_production_order: number
  ): Promise<CheckToolPrinter[]> {
    return await this.ormRepository.query(`SELECT * FROM check_tool_printer c WHERE c.id_production_order = '${id_production_order}'`)
  }


  public async findByLineAndProductionOrder(
    id_line: number,
    id_production_order: number
  ): Promise<CheckToolPrinter[]> {
    return await this.ormRepository.find({
      where: {
        id_line,
        id_production_order,
      },
      relations: ['product', 'toolgroup', 'toolingControl', 'squeegee'],
    });
  }

  async updateStatusListcode(
    list_code: string,
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder('check_tool_printer')
      .update(CheckToolPrinter)
      .set({status: "finish_op_list"}) // retirado delete na refatoração
      .where({ list_code })
      .execute()
  }

  async updateStatusOP(
    id_production_order: number,
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder('check_tool_printer')
      .update(CheckToolPrinter)
      .set({status: "finish_op"}) // retirado delete na refatoração
      .where({ id_production_order })
      .execute()
  }

  public async findByProdutionOrderStatus(
    id_production_order: number,
  ): Promise<CheckToolPrinter[] | undefined> {
    return await this.ormRepository.find({
      where: {
        id_production_order,
        status: null,
      },
    });
  }

  public async findByTooling(
    list_code: string
  ): Promise<CheckToolPrinter[] | undefined> {
    return await this.ormRepository.find({
      select: ['id_tooling_control', 'id_squeegee'],
      where: {
        list_code
      },
    });
  }

}
