/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
import {
  ICreateMaterialManagerDTO,
  IMaterialPagination,
} from '@modules/material/dtos/ICreateMaterialManagerDTO';
import IMaterialManagerRepository from '@modules/material/repositories/IMaterialManagerRepository';
import { getRepository, Like, Repository } from 'typeorm';
import ProductDelimiter from '@modules/products/infra/typeorm/entities/ProductDelimiter';
import Product from '@modules/products/infra/typeorm/entities/Product';
import OvenTemperatureRecord from '@modules/oven_temperature_record/infra/typeorm/entities/OvenTemperatureRecord';
import { MaterialManager } from '../entities/MaterialManager';


const TOTAL_PER_PAGE = 5;

export class MaterialManagerRepository implements IMaterialManagerRepository {
  private ormRepository: Repository<MaterialManager>;

  private ormProductDelimiterRepository: Repository<ProductDelimiter>;

  private ormProductRepository: Repository<Product>;

  private ormOvenTemperatureRecordRepository: Repository<OvenTemperatureRecord>;

  constructor() {
    this.ormRepository = getRepository(MaterialManager);
    this.ormProductDelimiterRepository = getRepository(ProductDelimiter);
    this.ormProductRepository = getRepository(Product);
    this.ormOvenTemperatureRecordRepository = getRepository(OvenTemperatureRecord);
  }

  public async updateFile(list_code: string, filename: string): Promise<any> {
    return await this.ormRepository
      .createQueryBuilder()
      .update(MaterialManager)
      .set({ oven_profile: filename })
      .where({ list_code })
      .execute();
  }

  public async findByListCodes(list_code: string): Promise<MaterialManager[]> {
    return await this.ormRepository.query(
      `${'SELECT * FROM smt_material_manager where list_code = "'}${list_code}"`
    );
  }

  public async findByComponentAndListCode(
    component: string,
    list_code: string
  ): Promise<MaterialManager[]> {
    return await this.ormRepository.find({
      where: [
        {
          list_code,
          main_components: component,
        },
        {
          list_code,
          alternative_components: component,
        },
      ],
    });
  }


  public async findByStructCode(
    list_code: string
  ): Promise<MaterialManager[]| undefined> {
    const findMaterial = await this.ormRepository.findOne({
      where: { list_code },
    });

    return findMaterial;
  }

  public async countPositionInModule(
    list_code: string,
    machine: string,
    module: string,
    side: number
  ): Promise<number> {
    const count = await this.ormRepository.count({
      where: { list_code, machine, module, side },
    });

    return count;
  }

  public async findByListCodeSearch(
    list_code: string
  ): Promise<MaterialManager[] | undefined> {
    const materials = await this.ormRepository.query(
      `${'SELECT ' +
      'distinct ' +
      'smt.list_code, ' +
      'smt.struct_code, ' +
      'smt.side_product, ' +
      'smt.status, ' +
      'smt.version, ' +
      'smt.oven_profile, ' +
      'e.username, ' +
      'l.line_name ' +
      'FROM smt_material_manager smt ' +
      'JOIN employees e ' +
      'on smt.id_employee = e.id ' +
      'LEFT JOIN smt_material_manager_setup smt_s ' +
      'on smt.list_code = smt_s.list_code ' +
      'LEFT JOIN `lines` l ' +
      'on smt_s.id_line = l.id ' +
      'where smt.deleted_at is null ' +
      'and smt.status <> "update" ' +
      'and smt.status <> "finished" ' +
      'and smt.list_code = "'
      }${list_code}"`
    );

    return materials;
  }

  public async listAll(page = 1): Promise<IMaterialPagination> {
    const offset = (page - 1) * TOTAL_PER_PAGE;

    const materials = await this.ormRepository.query(
      `${'SELECT ' +
      'distinct ' +
      'smt.list_code, ' +
      'smt.struct_code, ' +
      'smt.side_product, ' +
      'smt.status, ' +
      'smt.version, ' +
      'smt.oven_profile, ' +
      'e.username, ' +
      'l.line_name ' +
      'FROM smt_material_manager smt ' +
      'JOIN employees e ' +
      'on smt.id_employee = e.id ' +
      'LEFT JOIN smt_material_manager_setup smt_s ' +
      'on smt.list_code = smt_s.list_code ' +
      'LEFT JOIN `lines` l ' +
      'on smt_s.id_line = l.id ' +
      'where smt.deleted_at is null ' +
      'and smt.status <> "update" ' +
      'and smt.status <> "finished" ' +
      'LIMIT '
      }${TOTAL_PER_PAGE} OFFSET ${offset}`
    );

    const total = await this.ormRepository
      .createQueryBuilder('smt_material_manager')
      .select('list_code')
      .distinct(true)
      .getRawMany();

    const totalMaterials = total.length;

    return {
      materials,
      totalMaterials,
      totalPages: totalMaterials / TOTAL_PER_PAGE,
    };
  }

  public async findDetailsByListCode(
    list_code: string
  ): Promise<MaterialManager[] | undefined> {
    const result = await this.ormRepository.find({
      relations: ['employee'],
      where: { list_code },
      // order: { machine: 'ASC', module: 'ASC', side: 'ASC', position: 'ASC' }, // retirado ordenação lista
    });

    const material = result.map((item) => {
      // @ts-expect-error
      delete item.employee.password;

      return item;
    });

    return material;
  }

  public async findDetailsByListCodeQuality(
    list_code: string
  ): Promise<MaterialManager[] | undefined> {
    const result = await this.ormRepository.find({
      relations: ['employee'],
      where: { list_code },
      order: { machine: 'ASC', module: 'ASC', side: 'ASC', position: 'ASC' }, // retirado ordenação lista
    });

    const material = result.map((item) => {
      // @ts-expect-error
      delete item.employee.password;

      return item;
    });

    return material;
  }

  public async findById(id: number): Promise<MaterialManager | undefined> {
    const findMaterial = await this.ormRepository.findOne(id);

    return findMaterial;
  }

  public async findDetailsToPdfByListCode(
    list_code: string
  ): Promise<MaterialManager[] | undefined> {
    const material = await this.ormRepository.find({
      where: { list_code },
      // order: { machine: 'ASC', module: 'ASC', side: 'ASC', position: 'ASC' }, // retirado ordenação lista
    });

    return material;
  }

  public async toggleDisableComponentMaterial({
    id,
    status_component,
  }: MaterialManager): Promise<MaterialManager> {
    const disable = await this.ormRepository.save({
      id,
      status_component,
    });

    return disable;
  }

  public async create(
    data: ICreateMaterialManagerDTO[]
  ): Promise<MaterialManager[]> {
    const materialManager = this.ormRepository.create(data);

    await this.ormRepository.save(materialManager);

    return materialManager;
  }

  public async delete(list_code: string): Promise<void> {
    await this.ormRepository.softDelete({ list_code });
  }

  public async validateFieldListMaterialWithListCode(
    field: string,
    value: string | number,
    list_code = ''
  ): Promise<boolean> {
    let exists = false;

    if (list_code.length > 0) {
      exists = !!(await this.ormRepository.findOne({
        where: { list_code, [field]: value },
      }));
    } else {
      exists = !!(await this.ormRepository.findOne({
        where: { [field]: value },
      }));
    }

    return exists;
  }

  public async validateFieldListMaterial(
    field: string,
    value: string | number
  ): Promise<boolean> {
    const exists = !!(await this.ormRepository.findOne({
      where: { [field]: value },
    }));

    return exists;
  }

  public async updateStatus(
    list_code: string,
    status: 'online' | 'loading' | 'available',
    id_employee: number
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(MaterialManager)
      .set({ status, id_employee })
      .where({ list_code })
      .execute();
  }

  public async findComponentOrAlternateMaterial(
    component: string,
    module: string,
    side: number,
    position: number,
    list_code: string
  ): Promise<MaterialManager | undefined> {
    const material = await this.ormRepository.findOne({
      where: [
        { main_components: component, list_code, module, side, position },
        {
          alternative_components: component,
          list_code,
          module,
          side,
          position,
        },
      ],
    });
    return material;
  }

  public async findComponent(
    component: string,
    module: string,
    side: number,
    position: number,
    list_code: string
  ): Promise<MaterialManager[]> {
    const material = await this.ormRepository.find({
      where: { main_components: component, list_code, module, side, position },
    });
    return material;
  }

  public async updateStatusComponent(id: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(MaterialManager)
      .set({ status_component: 'read' })
      .where({ id })
      .execute();
  }

  public async verifyListStatus(list_code: string): Promise<MaterialManager[]> {
    const material = await this.ormRepository.find({
      where: { list_code, status: 'available' },
    });

    return material;
  }

  public async verifyProductList(
    struct_code: string
  ): Promise<MaterialManager | undefined> {
    const material = await this.ormRepository.findOne({
      where: { struct_code },
      order: { created_at: 'DESC' },
    });

    return material;
  }

  public async verifyComponentMaterialListMerge(
    struct_code: string,
    list_code: string,
    component: string,
    module: string,
    side: number,
    position: number
  ): Promise<MaterialManager | undefined> {
    const material = await this.ormRepository.findOne({
      where: {
        struct_code,
        list_code,
        main_components: component,
        module,
        side,
        position,
      },
    });

    return material;
  }

  public async updateQuantityComponentMerge(
    list_code: string,
    components: string,
    module: string,
    side: number,
    position: number,
    quantity: number,
    quantityBot: number
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(MaterialManager)
      .set({ quantity,  qtyBot: quantityBot  })
      .where({ list_code, main_components: components, module, side, position })
      .execute();
  }

  public async updateSideProductComponentMerge(
    list_code: string,
    struct_code: string
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(MaterialManager)
      .set({ side_product: 'C' })
      .where({ list_code, struct_code })
      .execute();
  }

  public async updateFeederPitch(
    id: number,
    feeder_pitch: number
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(MaterialManager)
      .set({ feeder_pitch })
      .where({ id })
      .execute();
  }

  public async listAllFilter(
    page = 1,
    struct_code: string,
    status: string,
    side: string
  ): Promise<IMaterialPagination | undefined> {
    if (
      struct_code != 'undefined' &&
      status != 'undefined' &&
      side != 'undefined'
    ) {
      var offset = (page - 1) * TOTAL_PER_PAGE;

      const materials = await this.ormRepository.query(
        `${'SELECT ' +
        'distinct ' +
        'smt.list_code, ' +
        'smt.struct_code, ' +
        'smt.side_product, ' +
        'smt.status, ' +
        'smt.version, ' +
        'smt.oven_profile, ' +
        'e.username, ' +
        'l.line_name ' +
        'FROM smt_material_manager smt ' +
        'JOIN employees e ' +
        'on smt.id_employee = e.id ' +
        'LEFT JOIN smt_material_manager_setup smt_s ' +
        'on smt.list_code = smt_s.list_code ' +
        'LEFT JOIN `lines` l ' +
        'on smt_s.id_line = l.id ' +
        'where smt.deleted_at is null ' +
        'and struct_code = "'
        }${struct_code}"` +
        `and smt.side_product = "${side}"` +
        `and smt.status = "${status}"` +
        ` LIMIT ${TOTAL_PER_PAGE} OFFSET ${offset}`
      );

      const total = await this.ormRepository
        .createQueryBuilder('smt_material_manager')
        .select('list_code')
        .where({ struct_code })
        .distinct(true)
        .getRawMany();

      const totalMaterials = total.length;

      return {
        materials,
        totalMaterials,
        totalPages: totalMaterials / TOTAL_PER_PAGE,
      };
    }

    if (struct_code != 'undefined') {
      var offset = (page - 1) * TOTAL_PER_PAGE;
      const materials = await this.ormRepository.query(
        `${'SELECT ' +
        'distinct ' +
        'smt.list_code, ' +
        'smt.struct_code, ' +
        'smt.side_product, ' +
        'smt.status, ' +
        'smt.version, ' +
        'smt.oven_profile, ' +
        'e.username, ' +
        'l.line_name ' +
        'FROM smt_material_manager smt ' +
        'JOIN employees e ' +
        'on smt.id_employee = e.id ' +
        'LEFT JOIN smt_material_manager_setup smt_s ' +
        'on smt.list_code = smt_s.list_code ' +
        'LEFT JOIN `lines` l ' +
        'on smt_s.id_line = l.id ' +
        'where smt.deleted_at is null ' +
        'and struct_code = "'
        }${struct_code}"` + ` LIMIT ${TOTAL_PER_PAGE} OFFSET ${offset}`
      );

      const total = await this.ormRepository
        .createQueryBuilder('smt_material_manager')
        .select('list_code')
        .where({ struct_code })
        .distinct(true)
        .getRawMany();

      const totalMaterials = total.length;

      return {
        materials,
        totalMaterials,
        totalPages: totalMaterials / TOTAL_PER_PAGE,
      };
    }
    if (status != 'undefined') {
      var offset = (page - 1) * TOTAL_PER_PAGE;
      const materials = await this.ormRepository.query(
        `${'SELECT ' +
        'distinct ' +
        'smt.list_code, ' +
        'smt.struct_code, ' +
        'smt.side_product, ' +
        'smt.status, ' +
        'smt.version, ' +
        'smt.oven_profile, ' +
        'e.username, ' +
        'l.line_name ' +
        'FROM smt_material_manager smt ' +
        'JOIN employees e ' +
        'on smt.id_employee = e.id ' +
        'LEFT JOIN smt_material_manager_setup smt_s ' +
        'on smt.list_code = smt_s.list_code ' +
        'LEFT JOIN `lines` l ' +
        'on smt_s.id_line = l.id ' +
        'where smt.deleted_at is null ' +
        'and smt.status = "'
        }${status}"` + ` LIMIT ${TOTAL_PER_PAGE} OFFSET ${offset}`
      );

      const total = await this.ormRepository
        .createQueryBuilder('smt_material_manager')
        .select('list_code')
        .where({ status })
        .distinct(true)
        .getRawMany();

      const totalMaterials = total.length;

      return {
        materials,
        totalMaterials,
        totalPages: totalMaterials / TOTAL_PER_PAGE,
      };
    }
    if (side != 'undefined') {
      var offset = (page - 1) * TOTAL_PER_PAGE;
      const materials = await this.ormRepository.query(
        `${'SELECT ' +
        'distinct ' +
        'smt.list_code, ' +
        'smt.struct_code, ' +
        'smt.side_product, ' +
        'smt.status, ' +
        'smt.version, ' +
        'smt.oven_profile, ' +
        'e.username, ' +
        'l.line_name ' +
        'FROM smt_material_manager smt ' +
        'JOIN employees e ' +
        'on smt.id_employee = e.id ' +
        'LEFT JOIN smt_material_manager_setup smt_s ' +
        'on smt.list_code = smt_s.list_code ' +
        'LEFT JOIN `lines` l ' +
        'on smt_s.id_line = l.id ' +
        'where smt.deleted_at is null ' +
        'and smt.side_product = "'
        }${side}"` + ` LIMIT ${TOTAL_PER_PAGE} OFFSET ${offset}`
      );

      const total = await this.ormRepository
        .createQueryBuilder('smt_material_manager')
        .select('list_code')
        .where({ side_product: side })
        .distinct(true)
        .getRawMany();

      const totalMaterials = total.length;

      return {
        materials,
        totalMaterials,
        totalPages: totalMaterials / TOTAL_PER_PAGE,
      };
    }
  }

  public async updateStatusComponentOnline(list_code: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(MaterialManager)
      .set({ status_component: 'online' })
      .where({ list_code })
      .execute();
  }

  public async checkLatestProductList(
    list_code: string
  ): Promise<MaterialManager[]> {
    const result = await this.ormRepository.find({
      where: [{ list_code }],
    });

    return result;
  }

  public async checkLatestProductListMerge(
    list_code: string
  ): Promise<MaterialManager[]> {
    const result = await this.ormRepository
      .createQueryBuilder('smt_material_manager')
      .withDeleted()
      .select([
        'list_code',
        'main_components',
        'machine',
        'module',
        'side',
        'position',
        'version',
        'status',
        'oven_profile'
      ])
      .where(
        `
      list_code='${list_code}'
    `
      )
      .orderBy('created_at', 'DESC')
      .getRawMany();

    return result;
  }

  public async updateStatusComponentRead(
    list_code: string,
    component: string,
    position: number
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(MaterialManager)
      .set({ status_component: 'read' })
      .where({ list_code, main_components: component, position })
      .orWhere({ list_code, alternative_components: component, position })
      .execute();
  }

  public async consultarModulo(
    list_code: string
  ): Promise<MaterialManager[] | undefined> {
    const material = await this.ormRepository
      .createQueryBuilder('smt_material_manager')
      .select('module')
      .where({ list_code })
      .distinct(true)
      .getRawMany();

    return material;
  }

  public async moduloLido(
    list_code: string
  ): Promise<MaterialManager[] | undefined> {
    const material = await this.ormRepository.query(
      `${'SELECT ' +
      'DISTINCT module ' +
      'FROM smt_quality_body ' +
      'where created_at >= NOW() - INTERVAL 1 HOUR ' +
      'and list_code = "'
      }${list_code}"`
    );

    return material;
  }

  public async totalComponentSMTList(list_code: string): Promise<number> {
    const total = await this.ormRepository
      .createQueryBuilder('smt_material_manager')
      .select(['main_components', 'machine', 'module', 'side', 'position'])
      .where({ list_code })
      .distinct(true)
      .getRawMany();

    return total.length;
  }

  public async totalComponentSMTListRead(list_code: string): Promise<number> {
    const total = await this.ormRepository
      .createQueryBuilder('smt_material_manager')
      .select(['main_components', 'machine', 'module', 'side', 'position'])
      .where({ list_code, status_component: 'read' })
      .distinct(true)
      .getRawMany();

    return total.length;
  }

  public async totalComponentSMTUnread(
    list_code: string
  ): Promise<MaterialManager[]> {
    const total = await this.ormRepository
      .createQueryBuilder('smt_material_manager')
      .withDeleted()
      .select(['main_components', 'machine', 'module', 'side', 'position'])
      .where({ list_code, status_component: 'online' })
      .distinct(true)
      .getRawMany();

    return total;
  }

  public async totalComponentSMTListQuality(
    list_code: string,
    machine: string,
    module: string,
    side: number
  ): Promise<number> {
    const total = await this.ormRepository
      .createQueryBuilder('smt_material_manager')
      .select(['main_components', 'position'])
      .where({ list_code, machine, module, side })
      .distinct(true)
      .getRawMany();

    return total.length;
  }

  public async componentAlternativeLines(
    list_code: string,
    component: string,
    position: number
  ): Promise<MaterialManager[]> {
    const material = await this.ormRepository
      .createQueryBuilder('smt_material_manager')
      .select(['main_components', 'machine', 'module', 'side', 'position'])
      .where({ list_code, main_components: component, position })
      .orWhere({ list_code, alternative_components: component, position })
      .getRawMany();

    return material;
  }

  public async findByListCode(
    list_code: string
  ): Promise<MaterialManager | undefined> {
    const findMaterial = await this.ormRepository.findOne({
      where: { list_code },
    });

    return findMaterial;
  }

  public async findProductDelimiter(
    product_name: string
  ): Promise<ProductDelimiter[]> {
    const validation = await this.ormProductDelimiterRepository.find({
      relations: ['product'],
      where: { product: { product_name: Like(`%${product_name}%`) } }
    });
    return validation;
  }

  public async findProductName(
    list_code: string,
  ): Promise<MaterialManager[] | undefined> {
    const material = await this.ormRepository
      .createQueryBuilder('smt_material_manager')
      .select(['struct_code'])
      .where({ list_code })
      .distinct(true)
      .getRawMany();

    return material;
  }

  // public async verificationStatusOven(
  //   list_code: string,
  // ): Promise<MaterialManager[]> {
  //   const material = await this.ormOvenTemperatureRecordRepository
  //     .createQueryBuilder('oven_temperature_record')
  //     .select(['status'])
  //     .where({ list_code })
  //     .distinct(true)
  //     .getRawMany();

  //   return material;
  // }

  public async verificationStatusOven(list_code: string): Promise<string | null> {
    const statusRecord = await this.ormOvenTemperatureRecordRepository.findOne({
      select: ['status'],
      order: { id: 'DESC' },
      where: { list_code }
    });

    return statusRecord?.status || null;
  }




}
