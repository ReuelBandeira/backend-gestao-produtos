import ICreateDowntimeManagementDTO, {
  DowntimeManagementPagination,
// eslint-disable-next-line import/no-unresolved
} from '@modules/downtime_management/dtos/IDowntimeManagementDTO';
import IDowntimeManagementRepository from '@modules/downtime_management/repositories/IDowntimeManagementRepository';
import { getRepository, Like, Repository } from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';
import ToolGroup from '@modules/tool_group/infra/typeorm/entities/Toolgroup';
import Employee from '@modules/employee/infra/typeorm/entities/Employee';
import MachineRegisters from '@modules/machine_registers/infra/typeorm/entities/MachineRegisters';
import DowntimeManagement from '../entities/DowntimeManagement';
import MachineRegistersModules from '@modules/machine_registers/infra/typeorm/entities/MachineRegistersModules';
import Action from '@modules/action_downtime/infra/typeorm/entities/Action';
import Cause from '@modules/cause_downtime/infra/typeorm/entities/Cause';
import Departament from '@modules/employee/infra/typeorm/entities/Departament';
import Type from '@modules/type_downtime/infra/typeorm/entities/Type';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import { id } from 'date-fns/locale';
import DowntimeCheckinControl from '../entities/DowntimeCheckinControl';


const TOTAL_PER_PAGE = 11;

export default class DowntimeManagementRepository implements IDowntimeManagementRepository {
  private ormRepository: Repository<DowntimeManagement>;

  private ormEmployeeRepository: Repository<Employee>;

  private ormMachineRegistersRepository: Repository<MachineRegisters>;

  private ormModulesRepository: Repository<MachineRegistersModules>;

  private ormActionRepository: Repository<Action>;

  private ormCauseRepository: Repository<Cause>;

  private ormDepartamentRepository: Repository<Departament>;

  private ormTypeRepository: Repository<Type>;

  private ormLineRepository: Repository<Line>;

  private ormCheckinControlRepository: Repository<DowntimeCheckinControl>;


  constructor() {
    this.ormRepository = getRepository(DowntimeManagement);
    this.ormEmployeeRepository = getRepository(Employee);
    this.ormMachineRegistersRepository = getRepository(MachineRegisters);
    this.ormModulesRepository = getRepository(MachineRegistersModules);
    this.ormActionRepository = getRepository(Action);
    this.ormCauseRepository = getRepository(Cause);
    this.ormDepartamentRepository = getRepository(Departament);
    this.ormTypeRepository = getRepository(Type);
    this.ormLineRepository = getRepository(Line);
    this.ormCheckinControlRepository = getRepository(DowntimeCheckinControl);
  }


  public async findById(id: number): Promise<DowntimeManagement | undefined> {
    const findMachine_registers = await this.ormRepository.findOne({ id });

    return findMachine_registers;
  }

  public async findAllRegistersList():Promise <DowntimeManagement[]> {
    const downtime = await this.ormRepository.find({
      order:{id:'DESC'},
      relations: ['line','employee','cause','machine_registers','action','type','departments']
    });

    return  downtime;
  }

  async findRegisters(
  ): Promise<DowntimeManagement[] | undefined> {
    const modules = await this.ormRepository

      .createQueryBuilder('dowtime_management')
      .select([
        '*'
      ])

      .getRawMany();

    return modules;
  }


  public async findByDowntimeManagementName(
    id: number,
  ): Promise<DowntimeManagement | undefined> {
    const findTooling_control = await this.ormRepository.findOne({
      where: { id }
    });

    return findTooling_control;
  }

  public async findByIdToolgroup(
    id_toolgroup: number,
  ): Promise<DowntimeManagement | undefined> {
    const  findTooling_control = await this.ormRepository.findOne({
      where: { id_toolgroup },
    });

    return findTooling_control;
  }


  public async findByProductNameSearch(
    id_department: number,
  ): Promise<(DowntimeManagementPagination | undefined)[] | undefined> {
    const downtimeManagement = await this.ormRepository.find({
      relations: ['line','employee'],
      where: { id_department: Like(`%${id_department}%`) },
      order: { id: 'DESC' },

    });

    for (let i = 0; i < downtimeManagement.length; i ++){
      delete downtimeManagement[i].employee.password;
    };

    return {
      downtimeManagement,
    };


  }

  public async findAllDowntimeManagementFilter(
    page = 1 ,
    model: string,
    manufacturer: string,
  ): Promise<DowntimeManagementPagination> {

    if(model  && manufacturer && manufacturer !=='undefined'){

      const machineRegisters = await this.ormRepository.find({
        where: {model,manufacturer},
        relations: ['line','employee'],
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
      });

      const  totalDowntimeManagement = (await this.ormRepository.find({
        where: {model,manufacturer},
      })).length;

      return {
        machineRegisters,
        totalDowntimeManagement,
        totalPages:  totalDowntimeManagement / TOTAL_PER_PAGE,
      };
    }
      if(model){
        const machineRegisters = await this.ormRepository.find({
          relations: ['line','employee'],
          where: {model},
          order: { id: 'DESC' },
          skip: (page - 1) * TOTAL_PER_PAGE,
          take: TOTAL_PER_PAGE,
        });

        const totalDowntimeManagement = (await this.ormRepository.find({
          where: {model}
        })).length;

        return {
          machineRegisters,
          totalDowntimeManagement,
          totalPages: totalDowntimeManagement / TOTAL_PER_PAGE,
        };

      }

        if(manufacturer){
          const machineRegisters = await this.ormRepository.find({
            relations: ['line','employee'],
            where: {manufacturer},
            order: { id: 'DESC' },
            skip: (page - 1) * TOTAL_PER_PAGE,
            take: TOTAL_PER_PAGE,
          });
          const totalDowntimeManagement = (await this.ormRepository.find({
            where: {manufacturer}
          })).length;

          return {
            machineRegisters,
            totalDowntimeManagement,
            totalPages: totalDowntimeManagement / TOTAL_PER_PAGE,
          };

        }



  }

  public async create({
      id_department,
      id_type,
      reason,
      stop_start_date,
      id_line,
      id_machine,
      equipment,
      id_cause,
      module,
      final_stop_date,
      status,
      name_machine,
      id_employee,
      id_employee_checkin,
      date_accompanying_checkin,
      serial_number,
      component,
      id_action,
      comment,
      zone_type,
      post
  }: ICreateDowntimeManagementDTO): Promise<DowntimeManagement> {
    const downtime_registers = this.ormRepository.create({
      id_department,
      id_type,
      reason,
      stop_start_date,
      id_line,
      id_machine,
      equipment,
      id_cause,
      module,
      final_stop_date,
      status,
      name_machine,
      id_employee,
      id_employee_checkin,
      date_accompanying_checkin,
      serial_number,
      component,
      id_action,
      comment,
      zone_type,
      post
    });

    await this.ormRepository.save(downtime_registers);

    return downtime_registers;
  }

  public async update(
    id: number,

    id_employee:number,
    final_stop_date:Date,
    status:string,
    name_machine:string,
    comment:string,
    date_accompanying_checkin:Date,
    id_cause:number,
    id_action:number


  ): Promise<void> {

    var validation_user=final_stop_date;


    // eslint-disable-next-line eqeqeq
    if (final_stop_date == undefined) {
      await this.ormRepository.createQueryBuilder()
      .update(DowntimeManagement)
      .set({final_stop_date,status,name_machine,comment,id_employee_checkin:id_employee,date_accompanying_checkin,id_cause,id_action})
      .where({ id })
      .execute();
    } else
    await this.ormRepository.createQueryBuilder()
      .update(DowntimeManagement)
      .set({final_stop_date,status,name_machine,comment,id_employee_closed:id_employee,date_accompanying_checkin,id_cause,id_action})
      .where({ id })
      .execute();
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }


  public async userCheckType(
    id: number,
  ): Promise<Employee[] | undefined > {
    const validation = await this.ormEmployeeRepository
      .createQueryBuilder('employees')
      .select([
        'id',
        'role',
        'username',
        'name'
      ])
      .where({id})
      .getRawMany();

    return validation;
  }

  public async validationUserType(
    id: number,
  ): Promise<Employee[] | undefined > {
    const validation_user = await this.ormEmployeeRepository
      .createQueryBuilder('employees')
      .select([
        'id',
        'role',
        'username',
        'name'
      ])
      .where({id,role:"TECNICO_SMT"})
      .getRawMany();

    return validation_user;
  }

  public async validationUserTypeLeader(
    id: number,
  ): Promise<Employee[] | undefined > {
    const validation_user = await this.ormEmployeeRepository
      .createQueryBuilder('employees')
      .select([
        'id',
        'role',
        'username',
        'name'
      ])
      .where({id,role:"LIDER_LINHA"})
      .getRawMany();

    return validation_user;
  }

  public async validationUserTypeMonitor(
    id: number,
  ): Promise<Employee[] | undefined > {
    const validation_user = await this.ormEmployeeRepository
      .createQueryBuilder('employees')
      .select([
        'id',
        'role',
        'username',
        'name'
      ])
      .where({id,role:"MONITOR_LINHA"})
      .getRawMany();

    return validation_user;
  }

  public async validationCreate(
    model: string,
    description: string,
    manufacturer: string,
    serial_number: string,
    voltage: string,
    id_line: string,
    status:string,
    line_layout:number,
    module:string
  ): Promise<DowntimeManagement | undefined> {
    const findToolgroup = await this.ormRepository.findOne({

      where: {
        model,
        description,
        manufacturer,
        serial_number,
        voltage,
        id_line,
        status,
        line_layout,
        module

      },
    });

    return findToolgroup;
  }


  public async findAllMachines(page = 1): Promise<DowntimeManagementPagination> {
    const machineRegisters= await this.ormRepository.find({
      relations: ['line','employee'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalDowntimeManagement= (await this.ormRepository.find()).length;

    return {
      machineRegisters,
      totalDowntimeManagement,
      totalPages: totalDowntimeManagement / TOTAL_PER_PAGE,
    };
  }

  public async findAllDowntimeManagementList(page=1):Promise <DowntimeManagement[]> {
    const machineRegisters = await this.ormRepository.find({
      order:{id:'DESC'},
      relations: ['line','employee'],
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    return  machineRegisters;
  }


  public async validationSn(
    serial_number: string
  ): Promise<DowntimeManagement | undefined> {
    const findToolgroup = await this.ormRepository.findOne({
      where: {
        serial_number
      },
    });

    return findToolgroup;
  }

  public async validationCheckMachines(
    serial_number:string,
  ): Promise<MachineRegisters | undefined> {
    const validation_machine = await this.ormMachineRegistersRepository
      .createQueryBuilder('machine_registers')
      .select([
        'id as id_machine',
        'serial_number',

        'id_line'
      ])
      .where({serial_number})
      .getRawMany();

    return validation_machine;

  }


  public async findAll_line_positions (
    id_line: number
  ): Promise<DowntimeManagementPagination[]> {

  const machineRegisters = await this.ormRepository.find({
    where: {
      id_line,
      status:"ACTIVE"
    },
    order:{line_layout: 'ASC' }

  });

  return {machineRegisters};
}

public async  index_positions():Promise <DowntimeManagement[]> {
  const machineRegisters = await this.ormRepository.find({
    order:{id_line:'ASC',line_layout: 'ASC'},
    relations: ['line','employee'],
  });

  return  machineRegisters;
}

public async validationLayoutLine(
  id_line:number,
  line_layout:number,
  status:string

): Promise<DowntimeManagement| undefined> {
  const findToolgroup = await this.ormRepository.findOne({
    where: {
      id_line,
      line_layout,
      status:"ACTIVE"
    },
  });

  return findToolgroup;
}

async findModules(
  id_machine_registers : number,
): Promise<MachineRegistersModules[]| undefined> {
  const modules = await this.ormModulesRepository

    .createQueryBuilder('machine_registers_modules')
    .leftJoinAndSelect('machine_registers_modules.modules', 'modules')
    .select([
      'id_machine_registers',
      'modules.description as module'
    ])
    .where ({id_machine_registers})
    .getRawMany();

  return modules;
}

async stop_time(
  id: number
): Promise<DowntimeManagement []| undefined> {

  const findSolder = await this.ormRepository
    .createQueryBuilder('dowtime_management')
    .select([
      'DATEDIFF (final_stop_date,stop_start_date) AS number_days_downtime',
      'TIMEDIFF(final_stop_date ,stop_start_date) AS hours_downtime',
      'DATEDIFF (final_stop_date,date_accompanying_checkin) AS number_days_resolution_time',
      'TIMEDIFF(final_stop_date,date_accompanying_checkin) AS hours_resolution_time'
    ])
    .where ({id})
    .getRawMany();

  return findSolder;
}

async findEmployee(
  id: number,
): Promise<Employee[]| undefined> {
  const check_employee = await this.ormEmployeeRepository

    .createQueryBuilder('employees')
    .select([
      'username',
      'role'
    ])
    .where ({id})
    .getRawMany();

  return check_employee;
}

async findCause(
  id: number,
): Promise<Cause[]| undefined> {
  const check_cause = await this.ormCauseRepository

    .createQueryBuilder('cause_downtime')
    .select([
      'description'
    ])
    .where ({id})
    .getRawMany();

  return check_cause;
}

async findAction(
  id: number,
): Promise<Action[]| undefined> {
  const check_action = await this.ormActionRepository

    .createQueryBuilder('action_downtime')
    .select([
      'description'
    ])
    .where ({id})
    .getRawMany();

  return check_action;
}

async findDepartament(
  id: number,
): Promise<Departament[]| undefined> {
  const check_departament = await this.ormDepartamentRepository

    .createQueryBuilder('departments')
    .select([
      'name'
    ])
    .where ({id})
    .getRawMany();

  return check_departament;
}

async findType(
  id: number,
): Promise<Type[]| undefined> {
  const check_type = await this.ormTypeRepository

    .createQueryBuilder('type_downtime')
    .select([
      'description'
    ])
    .where ({id})
    .getRawMany();

  return check_type;
}

async findLine(
  id: number,
): Promise<Line[]| undefined> {
  const check_line = await this.ormLineRepository

    .createQueryBuilder('lines')
    .select([
      'line_name',
      'description'
    ])
    .where ({id})
    .getRawMany();

  return check_line;
}

async findMachine(
  id: number,
): Promise<MachineRegisters[]| undefined> {
  const check_machine = await this.ormMachineRegistersRepository
    .createQueryBuilder('machine_registers')
    .select([
      'description',
      'serial_number',
      'model',
      'line_layout'
    ])
    .where ({id})
    .getRawMany();

  return check_machine;
}

async findReportDonwtimefollowUp(
  dateStart: Date,
  dateEnd: Date,
): Promise<DowntimeManagement[]| undefined> {

  const status='EM ANDAMENTO'
  const report_downtime = await this.ormRepository

    .createQueryBuilder('dowtime_management')
    .select([
      '*'
    ])
    .where ( `dowtime_management.date_accompanying_checkin BETWEEN ' ${dateStart} 'AND' ${dateEnd}'`)
    .andWhere({status})
    .getRawMany();

  return report_downtime;
}

async findReportDonwtimeOpening(
  dateStart: Date,
  dateEnd: Date,
): Promise<DowntimeManagement[]| undefined> {
  const status='ABERTO'
  const report_downtime = await this.ormRepository

    .createQueryBuilder('dowtime_management')
    .select([
      '*'
    ])
    .where (`dowtime_management.stop_start_date BETWEEN ' ${dateStart} 'AND' ${dateEnd}'`)
    .andWhere({status})
    .getRawMany();

  return report_downtime;
}

async findReportDonwtimeFinalized(
  dateStart: Date,
  dateEnd: Date,
): Promise<DowntimeManagement[]| undefined> {
  const status='FINALIZADO'
  const report_downtime = await this.ormRepository

    .createQueryBuilder('dowtime_management')
    .select([
      '*'
    ])
    .where (`dowtime_management.final_stop_date BETWEEN ' ${dateStart} 'AND' ${dateEnd}'` )
    .andWhere({status})
    .getRawMany();

  return report_downtime;
}

  public async updateFinalized(
    id: number,
    id_employee:number,
    final_stop_date:string,
    status:string,
    comment:string,
    id_cause:number,
    id_action:number,

  ): Promise<void> {
    await this.ormRepository.createQueryBuilder()
      .update(DowntimeManagement)
      .set({final_stop_date,status,comment,id_employee_closed:id_employee,id_cause,id_action})
      .where({ id })
      .execute();
  }

  public async updateCheckin(
    id: number,
    id_employee:number,
    status:string,
    date_accompanying_checkin:string,
  ): Promise<void> {

    await this.ormRepository.createQueryBuilder()
      .update(DowntimeManagement)
      .set({status,id_employee_checkin:id_employee,date_accompanying_checkin})
      .where({ id })
      .execute();
  }

  public async findRegistersDowntimePagination(page=1): Promise<DowntimeManagement[] | undefined> {
    const downtimeManagement = await this.ormRepository.find({
      order: { id: 'ASC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalRegisters = (await this.ormRepository.find()).length;

    return {
      downtimeManagement,
      totalPages:totalRegisters/ TOTAL_PER_PAGE,
      totalRegisters,

    };
  }

  public async filterMachineDowntime(
    id_machine: number,
  ): Promise<DowntimeManagement[]| undefined> {
    const filter_machines = await this.ormRepository
      .createQueryBuilder('dowtime_management')
      .select([
        '*'
      ])
      .where({id_machine})
      .getRawMany();

    return filter_machines;
  }

  public async findFilterDowntimeReason(
    reason: string,
  ): Promise<DowntimeManagement[]| undefined> {
    const filter_reason = await this.ormRepository
      .createQueryBuilder('dowtime_management')
      .select([
        '*'
      ])
      .where({reason})
      .getRawMany();

    return filter_reason;
  }

  public async findFilterDowntimeCause(
    id_cause: number,
  ): Promise<DowntimeManagement[]| undefined> {
    const filter_cause = await this.ormRepository
      .createQueryBuilder('dowtime_management')
      .select([
        '*'
      ])
      .where({id_cause})
      .getRawMany();

    return filter_cause;
  }

  public async findFilterDowntimeAction(
    id_action: number,
  ): Promise<DowntimeManagement[]| undefined> {
    const filter_action = await this.ormRepository
      .createQueryBuilder('dowtime_management')
      .select([
        '*'
      ])
      .where({id_action})
      .getRawMany();

    return filter_action;
  }

  public async findFilterDowntimeLine(
    id_line: number,
  ): Promise<DowntimeManagement[]| undefined> {
    const filter_line = await this.ormRepository
      .createQueryBuilder('dowtime_management')
      .select([
        '*'
      ])
      .where({id_line})
      .getRawMany();

    return filter_line;
  }

  public async findFilterDowntimeComment(
    comment: string,
  ): Promise<DowntimeManagement[]| undefined> {
    const filter_comment = await this.ormRepository
      .createQueryBuilder('dowtime_management')
      .select([
        '*'
      ])
      .where({comment})
      .getRawMany();

    return filter_comment;
  }

  async findRegistersMachinesAll(
    ): Promise<DowntimeManagement[] | undefined> {
      const machines = await this.ormRepository
        .createQueryBuilder('dowtime_management')
        .leftJoinAndSelect('dowtime_management.machine_registers', 'machine_registers')
        .select([
          'id_machine',
          'machine_registers.model as name_machine',
          'machine_registers.description as description',
          'machine_registers.manufacturer as manufacturer',
          'machine_registers.serial_number as serial_number'
        ])
        .where('dowtime_management.id_machine  IS NOT NULL')
        .distinct(true)
        .orderBy('dowtime_management.id_machine ', 'ASC')
        .getRawMany();

      return machines;
    }

    async findRegistersReasonAll(
      ): Promise<DowntimeManagement[] | undefined> {
        const reasons = await this.ormRepository
          .createQueryBuilder('dowtime_management')
          .select([
            'reason',
          ])
          .where('dowtime_management.reason  IS NOT NULL')
          .distinct(true)
          .getRawMany();

        return reasons;
      }

      async findRegistersCauseAll(
        ): Promise<DowntimeManagement[] | undefined> {
          const causes = await this.ormRepository
            .createQueryBuilder('dowtime_management')
            .leftJoinAndSelect('dowtime_management.cause', 'cause_downtime')
            .select([
              'id_cause',
              'cause_downtime.description as cause',
            ])
            .where("dowtime_management.id_cause  IS NOT NULL")
            .distinct(true)
            .getRawMany();

          return causes;
        }

        async findRegistersActionAll(
          ): Promise<DowntimeManagement[] | undefined> {
            const actions = await this.ormRepository
              .createQueryBuilder('dowtime_management')
              .leftJoinAndSelect('dowtime_management.action', 'action_downtime')
              .select([
                'id_action',
                'action_downtime.description as action',
              ])
              .where("dowtime_management.id_action  IS NOT NULL")
              .distinct(true)
              .orderBy('dowtime_management.id_action', 'ASC')
              .getRawMany();

            return actions;
          }

          async findRegistersLineAll(
            ): Promise<DowntimeManagement[] | undefined> {
              const lines = await this.ormRepository
                .createQueryBuilder('dowtime_management')
                .leftJoinAndSelect('dowtime_management.line', 'lines')
                .select([
                  'id_line',
                  'lines.description as descripition',
                  'lines.line_name as line_name'
                ])
                .where('dowtime_management.id_line  IS NOT NULL')
                .distinct(true)
                .orderBy('dowtime_management.id_line', 'ASC')
                .getRawMany();

              return lines;
            }

 async findRegistersCommentAll(
  ): Promise<DowntimeManagement[] | undefined> {
    const comments = await this.ormRepository
      .createQueryBuilder('dowtime_management')
      .select([
        'comment',
      ])
      .where('dowtime_management.comment  IS NOT NULL')
      .distinct(true)
      .getRawMany();

    return comments;
  }

  async validationEmployeeCheckin(
    // eslint-disable-next-line no-shadow
    id:number
  ): Promise<DowntimeManagement []| undefined> {
    const employee_checkin = await this.ormRepository
      .createQueryBuilder('dowtime_management')
      .select([
        'id_employee_checkin'
      ])
      .where({id})
      .getRawMany();
    return employee_checkin;
  }

  // async findHistoryCheckin(
  //   id_downtime:number
  //   ): Promise<DowntimeCheckinControl[] | undefined> {
  //     const checkin_history = await this.ormCheckinControlRepository
  //       .createQueryBuilder('dowtime_checkin_control')
  //       .leftJoinAndSelect('dowtime_checkin_control.employee', 'employees')
  //       .select([
  //         'id',
  //         'employees.name'
  //       ])
  //       .where({id_downtime})
  //       .getRawMany();

  //     return checkin_history;
  //   }

  public async findHistoryCheckin(
    id_downtime:number,
  ): Promise<DowntimeCheckinControl [] | undefined> {
    const checkin_history = await this.ormCheckinControlRepository.find({
      where: {id_downtime},
      order: { id: 'DESC' }
    });

    return checkin_history;
  }

  async findEmaisUserSMT(
    ): Promise<Employee[]| undefined> {
      const email = await this.ormEmployeeRepository
        .createQueryBuilder('employees')
        .select([
          'username',
          'email'
        ])
        .where('employees.email IS NOT NULL')
        .andWhere({role:'TECNICO_SMT'})
        .distinct(true)
        // .orderBy('dowtime_management.id_machine ', 'ASC')
        .getRawMany();

      return email;
    }






}




