import { getRepository, Repository } from 'typeorm';
import IMaterialManagerSetupRepository from '@modules/material/repositories/IMaterialManagerSetupRepository';
import ICreateSetupDTO from '@modules/material/dtos/ICreateSetupDTO';
import { MaterialManagerSetup } from '../entities/MaterialManagerSetup';

export default class MaterialManagerSetupRepository
  implements IMaterialManagerSetupRepository
{
  private ormRepository: Repository<MaterialManagerSetup>;

  constructor() {
    this.ormRepository = getRepository(MaterialManagerSetup);
  }

  public async findByComponentAndSerial(
    component: string,
    serial: string
  ): Promise<MaterialManagerSetup | undefined> {
    return await this.ormRepository.findOne({
      relations: ['line'],
      where: {
        component,
        sequential: serial,
      },
    });
  }

  public async findLastMaterialManagerByListCode(
    list_code: string
  ): Promise<MaterialManagerSetup | undefined> {
    return await this.ormRepository.findOne({
      where: {
        list_code,
      },
      order: {
        created_at: 'DESC',
      },
      relations: ['line'],
    });
  }

  public async findSetupByListCode(
    list_code: string
  ): Promise<MaterialManagerSetup[]> {
    const material = await this.ormRepository.find({
      where: { list_code },
      relations: ['feeder'],
    });

    return material;
  }

  public async verifyLineListStatus(
    id_line: number,
    list_code: string
  ): Promise<MaterialManagerSetup[]> {
    const material = await this.ormRepository.find({
      where: { list_code, id_line },
    });

    return material;
  }

  public async create(data: ICreateSetupDTO): Promise<MaterialManagerSetup> {
    const setup = this.ormRepository.create(data);

    await this.ormRepository.save(setup);

    return setup;
  }

  public async getTotalSetupByListCode(list_code: string): Promise<number> {
    const total = await this.ormRepository
      .createQueryBuilder('smt_material_manager_setup')
      .select(['component', 'machine', 'module', 'side', 'position'])
      .where({ list_code, status: 'accomplished' })
      .distinct(true)
      .getRawMany();

    return total.length;
  }

  public async verifyComponentAlreadyRead(
    list_code: string,
    module: string,
    side: number,
    position: number,
    component: string
  ): Promise<boolean> {
    const componentRead = await this.ormRepository.findOne({
      where: {
        list_code,
        module,
        side,
        position,
        component,
        status: 'accomplished',
      },
    });

    return !!componentRead;
  }

  async findSetupByLog(
    dateStart: Date,
    dateEnd: Date
  ): Promise<MaterialManagerSetup[] | undefined> {
    const material = await this.ormRepository.query(
      `${
        ' SELECT DISTINCT ' +
        ' smts.list_code, ' +
        ' smt.struct_code, ' +
        ' smts.machine, ' +
        ' smts.side, ' +
        ' smts.module, ' +
        ' smts.position, ' +
        ' smts.id_feeder, ' +
        ' f.feeder_code, ' +
        ' smts.component, ' +
        ' e.name, ' +
        ' smts.created_at, ' +
        ' smts.qr_code_information ,' +
        ' smts.feeder_pitch ' +
        ' FROM smt_material_manager_setup smts ' +
        ' JOIN employees e ' +
        ' on smts.id_employee = e.id ' +
        ' JOIN feeders f ' +
        ' on smts.id_feeder = f.id ' +
        ' JOIN smt_material_manager smt ' +
        ' on smts.list_code = smt.list_code ' +
        ' WHERE smts.created_at BETWEEN "'
      }${dateStart}" AND "${dateEnd}"`
    );

    return material;
  }

  public async findSetupFeeder(
    list_code: string
  ): Promise<MaterialManagerSetup[]> {
    const setupFeeder = await this.ormRepository.find({
      where: { list_code },
    });

    return setupFeeder;
  }

  public async verifyLineList(
    list_code: string
  ): Promise<MaterialManagerSetup[]> {
    const material = await this.ormRepository.find({
      withDeleted: false,
      where: { list_code },
      order: { created_at: 'ASC' },
    });

    return material;
  }

  public async verifyStatusLineList(
    id_line: number
  ): Promise<MaterialManagerSetup[]> {
    const material = await this.ormRepository.query(
      `SELECT smts.id_line, smt.status FROM smt_material_manager_setup smts join smt_material_manager smt on smts.list_code = smt.list_code and smt.status = 'online' where smts.id_line = "${id_line}"`
    );

    return material;
  }

  // muda o status do setup de realizado para finalizado
  public async updateStatusSetup(list_code: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(MaterialManagerSetup)
      .set({ status: 'finished' })
      .where({ list_code, status: 'accomplished' })
      .execute();
  }

  verifyComponentSetup(
    list_code: string,
    component: string,
    alternative_component: string,
    module: string,
    side: number,
    position: number
  ): Promise<MaterialManagerSetup[]>;

  public async verifyComponentSetup(
    list_code: string,
    component: string,
    alternative_component: string,
    module: string,
    side: number,
    position: number
  ): Promise<MaterialManagerSetup[]> {
    const material = await this.ormRepository.find({
      withDeleted: false,
      where: [
        { list_code, component, module, side, position },
        { list_code, component: alternative_component, module, side, position },
      ],
      order: { created_at: 'ASC' },
    });

    return material;
  }

  public async verifyComponentSetupRefil(
    list_code: string,
    component: string,
    module: string,
    position: number
  ): Promise<MaterialManagerSetup | undefined> {
    const material = await this.ormRepository.findOne({
      withDeleted: false,
      where: { list_code, component, module, position },
      order: { created_at: 'ASC' },
    });

    return material;
  }

  public async validationFeederSetup(
    list_code: string,
    module: string,
    position: number,
    checkFeederId: number,
  ): Promise<MaterialManagerSetup[]> {
    const validation = await this.ormRepository.find({
      where: { list_code,module,position,id_feeder:checkFeederId },
      order: { id: 'DESC' },
    });
    return validation;
  }




}
