import Provider from '@modules/solder_paste/infra/typeorm/entities/Provider';
import ICreateSolderPasteControllDTO, {
  SolderPasteControllPagination,
} from '@modules/solder_paste/dtos/ICreateSolderPasteControllDTO';
import ISolderPasteControllRepository from '@modules/solder_paste/repositories/ISolderPasteControllRepository';
import {
  getRepository,
  Like,
  Repository,
  IsNull,
  Not,
  SelectQueryBuilder,
  Any,
} from 'typeorm';

import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import SolderPasteControll from '../entities/SolderPasteControll';

import ConfigureSoldePasteTime from '../entities/ConfigureSoldePasteTime';

const TOTAL_PER_PAGE = 11;

export default class SolderPasteControllRepository
  implements ISolderPasteControllRepository
{
  private ormRepository: Repository<SolderPasteControll>;

  private ormProviderRepository: Repository<Provider>;

  private ormEmployeeRepository: Repository<Employee>;

  private ormConfRepository: Repository<ConfigureSoldePasteTime>;

  constructor() {
    this.ormRepository = getRepository(SolderPasteControll);
    this.ormProviderRepository = getRepository(Provider);
    this.ormEmployeeRepository = getRepository(Employee);
    this.ormConfRepository = getRepository(ConfigureSoldePasteTime);
  }

  public async findBySerial(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined> {
    return await this.ormRepository.findOne({
      relations: ['provider', 'employee'],
      where: {
        serial_paste,
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
    });
  }

  public async findSerialSolderPasteProvider(
    serial_paste: string
  ): Promise<SolderPasteControll> {
    const solderPasteControll = await this.ormRepository.find({
      where: {
        serial_paste,
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
      order: { id: 'DESC' },
    });

    return solderPasteControll;
  }

  public async restriction_use_generated_tag(
    serial_paste: string
  ): Promise<SolderPasteControll> {
    const solderPasteValidation = await this.ormRepository.find({
      where: {
        datetime_freezer: IsNull(),
        datetime_unfreezer: IsNull(),
        datetime_use: IsNull(),
        deleted_at: IsNull(),
        serial_paste,
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
    });

    return solderPasteValidation;
  }

  public async findAllSolderPasteControllFreezerOrderAscLedFree(): Promise<
    SolderPasteControll[]
  > {
    const solderPasteControll = await this.ormRepository.find({
      where: {
        datetime_freezer: Not(IsNull()),
        datetime_unfreezer: IsNull(),
        datetime_use: IsNull(),
        type_paste: 'lead_free',
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
      order: { datetime_freezer: 'ASC' },
    });

    return solderPasteControll;
  }

  public async findAllSolderPasteControllFreezer(
    page = 1
  ): Promise<SolderPasteControllPagination> {
    const solderPasteControll = await this.ormRepository.find({
      where: {
        datetime_freezer: Not(IsNull()),
        datetime_unfreezer: IsNull(),
        datetime_use: IsNull(),
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
      order: { datetime_freezer: 'ASC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalSolderPasteControll = (
      await this.ormRepository.find({
        where: {
          datetime_freezer: Not(IsNull()),
          datetime_unfreezer: IsNull(),
          datetime_use: IsNull(),
          discard_status: 'No',
          lower_freezer_status: 'No',
        },
      })
    ).length;

    return {
      solderPasteControll,
      totalSolderPasteControll,
      totalPages: totalSolderPasteControll / TOTAL_PER_PAGE,
    };
  }

  public async findAllSolderPasteControllUnFreezer(
    page = 1
  ): Promise<SolderPasteControllPagination> {
    const offset = (page - 1) * TOTAL_PER_PAGE;
    const solderPasteControll = await this.ormRepository.query(
      `${
        ' SELECT ' +
        ' * ' +
        ' ,TIMEDIFF(current_timestamp(), datetime_unfreezer) AS defrost_time ' +
        ' ,DATEDIFF (current_timestamp(), datetime_unfreezer) AS number_days ' +
        ' from solder_paste_controll' +
        ' where' +
        ' datetime_freezer is not null and deleted_at is null ' +
        ' and datetime_unfreezer is not null' +
        ' and datetime_use is null' +
        ' and discard_status = "No" and lower_freezer_status = "No"' +
        ' order by datetime_unfreezer ASC' +
        ' LIMIT '
      }${TOTAL_PER_PAGE} OFFSET ${offset}`
    );

    const totalSolderPasteControll = (
      await this.ormRepository.find({
        where: {
          datetime_freezer: Not(IsNull()),
          datetime_unfreezer: Not(IsNull()),
          datetime_use: IsNull(),
          discard_status: 'No',
          lower_freezer_status: 'No',
        },
      })
    ).length;

    return {
      solderPasteControll,
      totalSolderPasteControll,
      totalPages: totalSolderPasteControll / TOTAL_PER_PAGE,
    };
  }

  public async findAllSolderPasteControllUse(
    page = 1
  ): Promise<SolderPasteControllPagination> {
    const solderPasteControll = await this.ormRepository.find({
      where: {
        datetime_freezer: Not(IsNull()),
        datetime_unfreezer: Not(IsNull()),
        datetime_use: Not(IsNull()),
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalSolderPasteControll = (
      await this.ormRepository.find({
        where: {
          datetime_freezer: Not(IsNull()),
          datetime_unfreezer: Not(IsNull()),
          datetime_use: Not(IsNull()),
          discard_status: 'No',
          lower_freezer_status: 'No',
        },
      })
    ).length;

    return {
      solderPasteControll,
      totalSolderPasteControll,
      totalPages: totalSolderPasteControll / TOTAL_PER_PAGE,
    };
  }

  public async create({
    serial_paste,
    datetime_freezer,
    datetime_unfreezer,
    datetime_use,
    status,
    id_employee,
    type_paste,
    id_provider,
    expiration_date,
    manufacturing_date,
    lot_number,
    weight,
  }: ICreateSolderPasteControllDTO): Promise<SolderPasteControll> {
    const solderPasteControll = this.ormRepository.create({
      serial_paste,
      datetime_freezer,
      datetime_unfreezer,
      datetime_use,
      status,
      id_employee,
      type_paste,
      id_provider,
      expiration_date,
      manufacturing_date,
      lot_number,
      weight,
    });

    await this.ormRepository.save(solderPasteControll);

    return solderPasteControll;
  }

  public async findBySerialName(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined> {
    const findSolder = await this.ormRepository.findOne({
      where: { status: 'Freezer', serial_paste , discard_status: 'No',lower_freezer_status: 'No'},
      // order: { id: 'DESC' },
    });

    return findSolder;
  }

  // adcionado para a regra da pasta pronto pra uso
  public async findBySerialuseName(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined> {
    const findSolder = await this.ormRepository.findOne({
      where: { status: 'Freezer', serial_paste , discard_status: 'No', lower_freezer_status: 'No'},
    });

    return findSolder;
  }

  public async updateDateTimeFreezer(serial_paste: string,id_employee_freezer :number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(SolderPasteControll)
      .set({
        datetime_freezer: Date(),
        status: 'Freezer',
        id_employee_freezer
      })
      .where({ serial_paste, datetime_use_line: IsNull() })
      .execute();
  }

  public async updateDateTimeUnFreezer(serial_paste: string,id_employee_unfreezer: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(SolderPasteControll)
      .set({
        datetime_unfreezer: Date(),
        status: 'UnFreezer',
        id_employee_unfreezer
      })
      .where({ serial_paste, status:'Freezer'})

      .execute();
  }

  public async updateDateTimeUse(serial_paste: string , id_employee_use: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(SolderPasteControll)
      .set({
        datetime_use: Date(),
        status: 'Use',
        id_employee_use
      })
      .where({ serial_paste })
      .execute();
  }

  public async findBySolderPasteControllUnFreezer(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined> {
    const findOneSolderPaste = await this.ormRepository.query(
      `${
        ' SELECT ' +
        ' * ' +
        ' ,TIMEDIFF(current_timestamp(), datetime_unfreezer) AS defrost_time ' +
        ' ,DATEDIFF (current_timestamp(), datetime_unfreezer) AS number_days ' +
        ' from solder_paste_controll' +
        ' where' +
        ' datetime_freezer is not null' +
        ' and datetime_unfreezer is not null' +
        ' and datetime_use is null' +
        ' and discard_status = "No" and lower_freezer_status = "No"' +
        ' and serial_paste = "'
      }${serial_paste}"`
    );

    return findOneSolderPaste;
  }

  public async findBySerialUse(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined> {
    const findSolder = await this.ormRepository.findOne({
      where: {
        serial_paste,
        status: 'Use',
        datetime_use: Not(IsNull()),
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
    });

    return findSolder;
  }

  public async findAllSolderPasteControllFreezerProviderOrderAsc(
    id_provider: number
  ): Promise<SolderPasteControll[]> {
    const solderPasteControll = await this.ormRepository.find({
      where: {
        datetime_freezer: Not(IsNull()),
        datetime_unfreezer: IsNull(),
        datetime_use: IsNull(),
        id_provider,
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
      order: { serial_paste: 'ASC' },
    });

    return solderPasteControll;
  }

  public async validation_input_sn_cooler(
    id_provider: number
  ): Promise<SolderPasteControll[]> {
    const solderPasteControll = await this.ormRepository.find({
      where: {
        datetime_freezer: IsNull(),
        datetime_unfreezer: IsNull(),
        datetime_use: IsNull(),
        deleted_at: IsNull(),
        id_provider,
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
      order: { serial_paste: 'ASC' },
    });

    return solderPasteControll;
  }

  public async findAllSolderPasteControllUnFreezerProviderOrderAsc(
    id_provider: number
  ): Promise<SolderPasteControll[]> {
    const solderPasteControll = await this.ormRepository.find({
      where: {
        datetime_freezer: Not(IsNull()),
        datetime_unfreezer: Not(IsNull()),
        datetime_use: IsNull(),
        id_provider,
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
      order: { serial_paste: 'ASC' },
    });

    return solderPasteControll;
  }

  public async findBySerialUnFreezer(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined> {
    const findSolder = await this.ormRepository.findOne({
      where: { status: 'UnFreezer', serial_paste,discard_status: 'No',lower_freezer_status: 'No'},
    });

    return findSolder;
  }

  async provider_name(id: number): Promise<Provider[] | undefined> {
    const findSolder = await this.ormProviderRepository
      .createQueryBuilder('provider')
      .select(['provider_name', 'description_provider', 'acronym', 'id'])
      .where({ id })
      .getRawMany();

    return findSolder;
  }



  async search_solder_paste(serial_paste: string): Promise<SolderPasteControll[] | undefined> {
    const findSolder = await this.ormRepository
      .createQueryBuilder('solder_paste_controll')
      .leftJoinAndSelect('solder_paste_controll.lines', 'lines')
      .select([
        'DATEDIFF(current_timestamp(), solder_paste_controll.datetime_unfreezer) AS number_days',
        'TIMEDIFF(current_timestamp(), solder_paste_controll.datetime_unfreezer) AS defrost_time',
        'solder_paste_controll.type_paste as type_paste',
        'solder_paste_controll.serial_paste as serial_paste',
        'solder_paste_controll.datetime_freezer as datetime_freezer',
        'solder_paste_controll.datetime_unfreezer as datetime_unfreezer',
        'solder_paste_controll.datetime_use as datetime_use',
        'solder_paste_controll.status as status',
        'solder_paste_controll.id_employee as id_employee',
        'solder_paste_controll.created_at as created_at',
        'solder_paste_controll.id_provider as id_provider',
        'solder_paste_controll.expiration_date as expiration_date',
        'solder_paste_controll.manufacturing_date as manufacturing_date',
        'solder_paste_controll.lot_number as lot_number',
        'solder_paste_controll.weight as weight',
        'solder_paste_controll.id_employee_freezer as id_employee_freezer',
        'solder_paste_controll.id_employee_unfreezer as id_employee_unfreezer',
        'solder_paste_controll.id_employee_use as id_employee_use',
        'DATEDIFF(solder_paste_controll.expiration_date,current_timestamp()) AS days_to_expiration',
        'TIMEDIFF(solder_paste_controll.expiration_date,current_timestamp()) AS expiration_time',
        'DATEDIFF(current_timestamp(), solder_paste_controll.datetime_use) AS days_lifetime',
        'TIMEDIFF(current_timestamp(), solder_paste_controll.datetime_use) AS time_lifetime',
        'DATEDIFF(solder_paste_controll.datetime_use, solder_paste_controll.datetime_unfreezer) AS days_thaw',
        'ROUND(TIME_TO_SEC(TIMEDIFF(solder_paste_controll.datetime_use, solder_paste_controll.datetime_unfreezer)) / 60) AS thaw_time',
        'lines.line_name as line_name',
      ])
      .where({ serial_paste, discard_status: 'No', lower_freezer_status: 'No' })
      .getRawMany();

    return findSolder;
  }


  async employee_name(id: number): Promise<Employee[] | undefined> {
    const findSolder = await this.ormEmployeeRepository
      .createQueryBuilder('employees')
      .select(['name', 'username'])
      .where({ id })
      .getRawMany();

    return findSolder;
  }

  public async generated_solder_paste_label(
    page = 1
  ): Promise<SolderPasteControllPagination> {
    const solderPasteControll = await this.ormRepository.find({
      where: {
        datetime_label_printing: Not(IsNull()),
        datetime_freezer: IsNull(),
        datetime_unfreezer: IsNull(),
        datetime_use: IsNull(),
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
      order: { datetime_freezer: 'ASC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalSolderPasteControll = (
      await this.ormRepository.find({
        where: {
          datetime_label_printing: Not(IsNull()),
          datetime_freezer: IsNull(),
          datetime_unfreezer: IsNull(),
          datetime_use: IsNull(),
          discard_status: 'No',
          lower_freezer_status: 'No',
        },
      })
    ).length;

    return {
      solderPasteControll,
      totalSolderPasteControll,
      totalPages: totalSolderPasteControll / TOTAL_PER_PAGE,
    };
  }

  async delete_solder_paste(
    serial_paste: string,
    description_discard: string,
    id_user: number
  ): Promise<void> {
    const id_users = id_user;
    await this.ormRepository
      .createQueryBuilder('solder_paste_controll')
      .update(SolderPasteControll)
      .set({
        discard_status: 'Yes',
        // deleted_at: new Date(),
        datetime_discard: new Date(),
        id_employee_discard: id_users,
        description_discard,
      })
      .where({ serial_paste })
      .execute();
  }

  async validation_serial_paste(
    serial_paste: string
  ): Promise<SolderPasteControll[] | undefined> {
    const findSolder = await this.ormRepository
      .createQueryBuilder('solder_paste_controll')
      .select(['serial_paste'])
      .where({ serial_paste, discard_status: 'No' })
      .getRawMany();

    return findSolder;
  }

  public async sn_history_provider_freezer(
    page = 1,
    id_provider: number
  ): Promise<SolderPasteControll[]> {
    const solderPasteControll = await this.ormRepository.find({
      where: {
        datetime_freezer: Not(IsNull()),
        datetime_unfreezer: IsNull(),
        datetime_use: IsNull(),
        id_provider,
        discard_status: 'No',
        lower_freezer_status: 'No',
      },
      order: { serial_paste: 'ASC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalSolderPasteControll = (
      await this.ormRepository.find({
        where: {
          datetime_freezer: Not(IsNull()),
          datetime_unfreezer: IsNull(),
          datetime_use: IsNull(),
          id_provider,
          discard_status: 'No',
          lower_freezer_status: 'No',
        },
      })
    ).length;

    return {
      solderPasteControll,
      totalSolderPasteControll,
      totalPages: totalSolderPasteControll / TOTAL_PER_PAGE,
    };
  }

  public async sn_history_provider_unfreezer(
    page = 1,
    id_provider: number
  ): Promise<SolderPasteControll[]> {
    const offset = (page - 1) * TOTAL_PER_PAGE;
    const solderPasteControllDay = await this.ormRepository.query(
      `${
        `${
          ' SELECT ' +
          ' * ' +
          ' ,TIMEDIFF(current_timestamp(), datetime_unfreezer) AS defrost_time ' +
          ' ,DATEDIFF (current_timestamp(), datetime_unfreezer) AS number_days ' +
          ' from solder_paste_controll' +
          ' where' +
          ' id_provider = '
        }${id_provider} and datetime_freezer is not null and deleted_at is null ` +
        ` and datetime_unfreezer is not null` +
        ` and datetime_use is null` +
        ' and discard_status = "No" and lower_freezer_status = "No"' +
        ` order by serial_paste ASC` +
        ` LIMIT `
      }${TOTAL_PER_PAGE} OFFSET ${offset}`
    );

    const totalSolderPasteControll = (
      await this.ormRepository.find({
        where: {
          datetime_freezer: Not(IsNull()),
          datetime_unfreezer: Not(IsNull()),
          datetime_use: IsNull(),
          id_provider,
          discard_status: 'No',
          lower_freezer_status: 'No',

        },
      })
    ).length;

    return {
      solderPasteControll: solderPasteControllDay,

      totalSolderPasteControll,
      totalPages: totalSolderPasteControll / TOTAL_PER_PAGE,
    };
  }

  public async sn_history_provider_label_generation(
    page = 1,
    id_provider: number
  ): Promise<SolderPasteControll[]> {
    const solderPasteControll = await this.ormRepository.find({
      where: {
        datetime_freezer: IsNull(),
        datetime_unfreezer: IsNull(),
        datetime_use: IsNull(),
        datetime_discard: IsNull(),
        id_provider,
        discard_status: 'No',
        lower_freezer_status: 'No',

      },
      order: { serial_paste: 'ASC' },

      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalSolderPasteControll = (
      await this.ormRepository.find({
        where: {
          datetime_freezer: IsNull(),
          datetime_unfreezer: IsNull(),
          datetime_use: IsNull(),
          datetime_discard: IsNull(),
          id_provider,
          discard_status: 'No',
          lower_freezer_status: 'No',

        },
      })
    ).length;

    return {
      solderPasteControll,
      totalSolderPasteControll,
      totalPages: totalSolderPasteControll / TOTAL_PER_PAGE,
    };
  }

  async findSolderHistoryDate(
    dateStart: Date,
    dateEnd: Date
  ): Promise<SolderPasteControll[] | undefined> {
    const material = await this.ormRepository

      .createQueryBuilder('solder_paste_controll')
      .leftJoinAndSelect('solder_paste_controll.employee', 'employee')
      .leftJoinAndSelect('solder_paste_controll.employee_freezer', 'employee_freezer')
      .leftJoinAndSelect('solder_paste_controll.employee_unfreezer', 'employee_unfreezer')
      .leftJoinAndSelect('solder_paste_controll.employee_use', 'employee_use')
      .leftJoinAndSelect('solder_paste_controll.provider', 'provider')
      .leftJoinAndSelect('solder_paste_controll.lines', 'lines')

      .select([
        'DATEDIFF (current_timestamp(), datetime_unfreezer) AS number_days',
        'TIMEDIFF(current_timestamp(), datetime_unfreezer) AS defrost_time',
        'serial_paste',
        'datetime_freezer',
        'datetime_unfreezer',
        'datetime_use',
        'datetime_label_printing',
        'status',
        'discard_status',
        'datetime_discard',
        'description_discard',
        'employee.name',
        'employee.username as employee_label',
        'provider.provider_name',
        'provider.acronym',
        'solder_paste_controll.created_at',
        'solder_paste_controll.id',
        'solder_paste_controll.expiration_date as expiration_date',
        'solder_paste_controll.manufacturing_date as manufacturing_date',
        'solder_paste_controll.lot_number as lot_number',
        'solder_paste_controll.weight as weight',
        'employee_freezer.username as employee_freezer',
        'employee_unfreezer.username as employee_unfreezer',
        'employee_use.username as employee_use',
        'DATEDIFF (expiration_date,current_timestamp()) AS days_to_expiration',
        'TIMEDIFF(expiration_date,current_timestamp()) AS expiration_time',
        'DATEDIFF (current_timestamp(), datetime_use) AS days_lifetime',
        'TIMEDIFF(current_timestamp(), datetime_use) AS time_lifetime',
        'DATEDIFF (datetime_use, datetime_unfreezer	) AS days_thaw',
        'ROUND(TIME_TO_SEC(TIMEDIFF(solder_paste_controll.datetime_use, solder_paste_controll.datetime_unfreezer)) / 60) AS thaw_time',
        'lines.line_name as line_name',
      ])
      .where(
        `solder_paste_controll.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}' `
      )
      .andWhere('discard_status = "No"')
      .andWhere('lower_freezer_status = "No"')
      .getRawMany();
    return material;
  }

  async findSolderHistoryDateDays(
    dateStart: Date,
    dateEnd: Date
  ): Promise<SolderPasteControll[] | undefined> {
    const material = await this.ormRepository

      .createQueryBuilder('solder_paste_controll')
      .leftJoinAndSelect('solder_paste_controll.employee', 'employee')
      .leftJoinAndSelect('solder_paste_controll.provider', 'provider')

      .select([
        'DATEDIFF (current_timestamp(), datetime_unfreezer) AS number_days',
        'TIMEDIFF(current_timestamp(), datetime_unfreezer) AS defrost_time',
        'serial_paste',
        'datetime_freezer',
        'datetime_unfreezer',
        'datetime_use',
        'datetime_label_printing',
        'status',
        'discard_status',
        'datetime_discard',
        'description_discard',
        'employee.name',
        'employee.username',
        'provider.provider_name',
        'provider.acronym',
        'solder_paste_controll.created_at',
        'solder_paste_controll.id',
        'solder_paste_controll.type_paste',
      ])
      .where(
        `solder_paste_controll.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd} ' `
      )
      .andWhere('discard_status = "No"')
      .andWhere('lower_freezer_status = "No"')

      .getRawMany();
    return material;
  }

  async conf_day(id_provider: number): Promise<SolderPasteControll[]> {
    const findSolder = await this.ormConfRepository
      .createQueryBuilder('solder_paste_type_time')
      .select(['thaw_time'])
      .where({ id_provider })
      .getRawMany();

    return findSolder;
  }

  async provider_name_sn(
    serial_paste: string
  ): Promise<SolderPasteControll[] | undefined> {
    const findprovider = await this.ormRepository
      .createQueryBuilder('solder_paste_controll')
      .select(['id_provider'])
      .where({ serial_paste, discard_status: 'No', lower_freezer_status: 'No' })
      .getRawMany();

    return findprovider;
  }

  public async findAllSUnFreezerTotal(): Promise<SolderPasteControllPagination> {
    const solderPasteControll = await this.ormRepository.query(
      `${
        ' SELECT ' +
        ' * ' +
        ' ,TIMEDIFF(current_timestamp(), datetime_unfreezer) AS defrost_time ' +
        ' ,DATEDIFF (current_timestamp(), datetime_unfreezer) AS number_days ' +
        ' from solder_paste_controll' +
        ' where' +
        ' datetime_freezer is not null and deleted_at is null ' +
        ' and datetime_unfreezer is not null' +
        ' and datetime_use is null' +
        ' and discard_status = "No" and lower_freezer_status = "No"' +
        ' order by datetime_unfreezer ASC'
      }`
    );

    return solderPasteControll;
  }

  async low_solder_paste(
    serial_paste: string,
    description_lower_freezer: string,
    id_user: number
  ): Promise<void> {
    const id_users = id_user;
    await this.ormRepository
      .createQueryBuilder('solder_paste_controll')
      .update(SolderPasteControll)
      .set({
        lower_freezer_status: 'Yes',
        // deleted_at: new Date(),
        datetime_lower_freezer: new Date(),
        id_employee_lower_freezer: id_users,
        description_lower_freezer,
      })
      .where({ serial_paste })
      .execute();
  }

  async solderPasteDiscardedReport(
    dateStart: Date,
    dateEnd: Date
  ): Promise<SolderPasteControll[] | undefined> {
    const material = await this.ormRepository

      .createQueryBuilder('solder_paste_controll')
      .leftJoinAndSelect('solder_paste_controll.employee', 'employee')
      .leftJoinAndSelect('solder_paste_controll.employee_freezer', 'employee_freezer')
      .leftJoinAndSelect('solder_paste_controll.employee_unfreezer', 'employee_unfreezer')
      .leftJoinAndSelect('solder_paste_controll.employee_use', 'employee_use')
      .leftJoinAndSelect('solder_paste_controll.provider', 'provider')
      .leftJoinAndSelect('solder_paste_controll.lines', 'lines')
      // .leftJoinAndSelect('solder_paste_controll.employee_lower_freezer', 'employee_lower_freezer')

      .select([
        'DATEDIFF (current_timestamp(), datetime_unfreezer) AS number_days',
        'TIMEDIFF(current_timestamp(), datetime_unfreezer) AS defrost_time',
        'serial_paste',
        'datetime_freezer',
        'datetime_unfreezer',
        'datetime_use',
        'datetime_label_printing',
        'status',
        'discard_status',
        'datetime_discard',
        'description_discard',
        'employee.name',
        'employee.username as employee_label',
        'provider.provider_name',
        'provider.acronym',
        'solder_paste_controll.created_at as created_at ',
        'solder_paste_controll.id as id',
        'solder_paste_controll.expiration_date as expiration_date',
        'solder_paste_controll.manufacturing_date as manufacturing_date',
        'solder_paste_controll.lot_number as lot_number',
        'solder_paste_controll.weight as weight',
        'employee_freezer.username as employee_freezer',
        'employee_unfreezer.username as employee_unfreezer',
        'employee_use.username as employee_use',
        'DATEDIFF (expiration_date,current_timestamp()) AS days_to_expiration',
        'TIMEDIFF(expiration_date,current_timestamp()) AS expiration_time',
        'DATEDIFF (current_timestamp(), datetime_use) AS days_lifetime',
        'TIMEDIFF(current_timestamp(), datetime_use) AS time_lifetime',
        'DATEDIFF (datetime_use, datetime_unfreezer	) AS days_thaw',
        'ROUND(TIME_TO_SEC(TIMEDIFF(solder_paste_controll.datetime_use, solder_paste_controll.datetime_unfreezer)) / 60) AS thaw_time',
        'lines.line_name as line_name',
        'id_employee_discard',

      ])
      .where(
        `solder_paste_controll.datetime_discard BETWEEN ' ${dateStart} 'AND' ${dateEnd}' `
      )
      // .andWhere('(discard_status = "Yes" OR lower_freezer_status = "Yes")')
      .andWhere('(discard_status = "Yes")')
      // .andWhere('solder_paste_controll.discard_status = :status', { status: 'Yes' })
      .getRawMany();
    return material;
  }

  async returnReportSolderPaste(
    dateStart: Date,
    dateEnd: Date
  ): Promise<SolderPasteControll[] | undefined> {
    const material = await this.ormRepository

      .createQueryBuilder('solder_paste_controll')
      .leftJoinAndSelect('solder_paste_controll.employee', 'employee')
      .leftJoinAndSelect('solder_paste_controll.employee_freezer', 'employee_freezer')
      .leftJoinAndSelect('solder_paste_controll.employee_unfreezer', 'employee_unfreezer')
      .leftJoinAndSelect('solder_paste_controll.employee_use', 'employee_use')
      .leftJoinAndSelect('solder_paste_controll.provider', 'provider')
      .leftJoinAndSelect('solder_paste_controll.lines', 'lines')

      .select([
        'DATEDIFF (current_timestamp(), datetime_unfreezer) AS number_days',
        'TIMEDIFF(current_timestamp(), datetime_unfreezer) AS defrost_time',
        'serial_paste',
        'datetime_freezer',
        'datetime_unfreezer',
        'datetime_use',
        'datetime_label_printing',
        'status',
        'discard_status',
        'datetime_discard',
        'description_discard',
        'employee.name',
        'employee.username as employee_label',
        'provider.provider_name',
        'provider.acronym',
        'solder_paste_controll.created_at as created_at ',
        'solder_paste_controll.id as id',
        'solder_paste_controll.expiration_date as expiration_date',
        'solder_paste_controll.manufacturing_date as manufacturing_date',
        'solder_paste_controll.lot_number as lot_number',
        'solder_paste_controll.weight as weight',
        'employee_freezer.username as employee_freezer',
        'employee_unfreezer.username as employee_unfreezer',
        'employee_use.username as employee_use',
        'DATEDIFF (expiration_date,current_timestamp()) AS days_to_expiration',
        'TIMEDIFF(expiration_date,current_timestamp()) AS expiration_time',
        'DATEDIFF (current_timestamp(), datetime_use) AS days_lifetime',
        'TIMEDIFF(current_timestamp(), datetime_use) AS time_lifetime',
        'DATEDIFF (datetime_use, datetime_unfreezer	) AS days_thaw',
        'ROUND(TIME_TO_SEC(TIMEDIFF(solder_paste_controll.datetime_use, solder_paste_controll.datetime_unfreezer)) / 60) AS thaw_time',
        'lines.line_name as line_name',
      ])
      .where(
        `solder_paste_controll.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}' `
      )
      .getRawMany();
    return material;
  }

  public async findBySerialMixer(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined> {
    return await this.ormRepository.find({
      // relations: ['provider', 'employee'],
      where: {
        serial_paste,
        discard_status: 'No'
      },
    });
  }

  async solderPasteLowReport(
    dateStart: Date,
    dateEnd: Date
  ): Promise<SolderPasteControll[] | undefined> {
    const material = await this.ormRepository

      .createQueryBuilder('solder_paste_controll')
      .leftJoinAndSelect('solder_paste_controll.employee', 'employee')
      .leftJoinAndSelect('solder_paste_controll.employee_freezer', 'employee_freezer')
      .leftJoinAndSelect('solder_paste_controll.employee_unfreezer', 'employee_unfreezer')
      .leftJoinAndSelect('solder_paste_controll.employee_use', 'employee_use')
      .leftJoinAndSelect('solder_paste_controll.provider', 'provider')
      .leftJoinAndSelect('solder_paste_controll.lines', 'lines')
      .leftJoinAndSelect('solder_paste_controll.employee_lower_freezer', 'employee_lower_freezer')

      .select([
        'DATEDIFF (current_timestamp(), datetime_unfreezer) AS number_days',
        'TIMEDIFF(current_timestamp(), datetime_unfreezer) AS defrost_time',
        'serial_paste',
        'datetime_freezer',
        'datetime_unfreezer',
        'datetime_use',
        'datetime_label_printing',
        'status',
        'employee.name',
        'employee.username as employee_label',
        'provider.provider_name',
        'provider.acronym',
        'solder_paste_controll.created_at as created_at ',
        'solder_paste_controll.id as id',
        'solder_paste_controll.expiration_date as expiration_date',
        'solder_paste_controll.manufacturing_date as manufacturing_date',
        'solder_paste_controll.lot_number as lot_number',
        'solder_paste_controll.weight as weight',
        'employee_freezer.username as employee_freezer',
        'employee_unfreezer.username as employee_unfreezer',
        'employee_use.username as employee_use',
        'DATEDIFF (expiration_date,current_timestamp()) AS days_to_expiration',
        'TIMEDIFF(expiration_date,current_timestamp()) AS expiration_time',
        'DATEDIFF (current_timestamp(), datetime_use) AS days_lifetime',
        'TIMEDIFF(current_timestamp(), datetime_use) AS time_lifetime',
        'DATEDIFF (datetime_use, datetime_unfreezer	) AS days_thaw',
        'ROUND(TIME_TO_SEC(TIMEDIFF(solder_paste_controll.datetime_use, solder_paste_controll.datetime_unfreezer)) / 60) AS thaw_time',
        'lines.line_name as line_name',
        'lower_freezer_status',
        'datetime_lower_freezer',
        'description_lower_freezer',
        'employee_lower_freezer.username as employee_lower_freezer'
      ])
      .where(
        `solder_paste_controll.datetime_lower_freezer BETWEEN ' ${dateStart} 'AND' ${dateEnd}' `
      )
      .andWhere('(lower_freezer_status = "Yes")')
      .getRawMany();
    return material;
  }

  async register_quantity_mixer(
    serial_paste: string,
    quantity_mixer: number
  ): Promise<void> {

    await this.ormRepository
      .createQueryBuilder('solder_paste_controll')
      .update(SolderPasteControll)
      .set({
        quantity_mixer,
      })
      .where({serial_paste})
      .execute();
  }

}
