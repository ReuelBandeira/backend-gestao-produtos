import { ICriticalComponentDTO } from "@modules/critical_components/dtos/ICriticalComponentDTO";
import { CriticalComponentUpdate, ICriticalComponentRepository } from "@modules/critical_components/repositories/ICriticalComponentRepository";
import { Repository, getRepository } from "typeorm";
import CriticalComponent from "../entities/CriticalComponent";

export class CriticalComponentRepository implements ICriticalComponentRepository {
  private ormrepository: Repository<CriticalComponent>;

  constructor() {
    this.ormrepository = getRepository(CriticalComponent);
  }

  async create(data: ICriticalComponentDTO): Promise<void> {
    await this.ormrepository.save(data)
  }

  async update(data: CriticalComponentUpdate): Promise<void> {
    await this.ormrepository.update(
      {
        component: data.component_old
      },
      {
        component: data.component_new,
        component_description: data.component_description,
        component_quantity: data.component_quantity
      }
    )
  }

  async findComponent(component: string): Promise<CriticalComponent | undefined> {
    return await this.ormrepository.findOne({
      where: {
        component
      }
    })
  }

  async findCriticals(id_line: number): Promise<CriticalComponent[]> {
    return await this.ormrepository.find({
      where: {
        id_line
      }
    })
  }

  public async updateListCriticals(
    list_codeAlt: string,
    list_code:string
  ): Promise<void> {
    await this.ormrepository
      .createQueryBuilder("critical_components")
      .update(CriticalComponent)
      .set({list_code})
      .where({list_code:list_codeAlt})
      .execute();
  }
}
