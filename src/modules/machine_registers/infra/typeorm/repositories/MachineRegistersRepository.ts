import ICreateMachineRegistersDTO, {
  MachineRegistersPagination,
// eslint-disable-next-line import/no-unresolved
} from '@modules/machine_registers/dtos/IMachineRegistersControlDTO';
import IMachineRegistersRepository from '@modules/machine_registers/repositories/IMachineRegistersRepository';
import { getRepository, Like, Repository } from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';
import ToolGroup from '@modules/tool_group/infra/typeorm/entities/Toolgroup';
import MachineRegisters, { StatusType } from '../entities/MachineRegisters';
import MachineRegistersModules from '../entities/MachineRegistersModules';
import Line from '@modules/lines/infra/typeorm/entities/Line';
import Modules from '@modules/module_machines/infra/typeorm/entities/Modules';
import DowntimeManagement from '@modules/downtime_management/infra/typeorm/entities/DowntimeManagement';


export default class MachineRegistersRepository implements IMachineRegistersRepository {
  private ormRepository: Repository<MachineRegisters>;

  private ormRepositoryProduc: Repository<Product>;

  private ormRepositoryToolGroup: Repository<ToolGroup>;

  private ormModulesRepository: Repository<MachineRegistersModules>;

  private ormlinesRepository: Repository<Line>;

  private ormModulesMachinesRepository: Repository<Modules>;

  private ormDowntimeManagementRepository: Repository<DowntimeManagement>;




  constructor() {
    this.ormRepository = getRepository(MachineRegisters);
    this.ormRepositoryProduc = getRepository(Product);
    this.ormRepositoryToolGroup = getRepository(ToolGroup);
    this.ormModulesRepository = getRepository(MachineRegistersModules);
    this.ormlinesRepository = getRepository(Line);
    this.ormModulesMachinesRepository = getRepository(Modules);
    this.ormDowntimeManagementRepository = getRepository(DowntimeManagement);
  }

  public async findById(id: number): Promise<MachineRegisters | undefined> {
    const findMachine_registers = await this.ormRepository.findOne({ id });

    return findMachine_registers;
  }

  public async findByMachine(id: number): Promise<MachineRegisters | undefined> {
    const findMachine_registers = await this.ormRepository.find({ id });

    return findMachine_registers;
  }

  public async findByMachineRegistersName(
    id: number,
  ): Promise<MachineRegisters | undefined> {
    const findTooling_control = await this.ormRepository.findOne({
      where: { id }
    });

    return findTooling_control;
  }

  public async findByIdToolgroup(
    id_toolgroup: number,
  ): Promise<MachineRegisters | undefined> {
    const  findTooling_control = await this.ormRepository.findOne({
      where: { id_toolgroup },
    });

    return findTooling_control;
  }


  public async findByProductNameSearch(
    serial_number: string,
  ): Promise<(MachineRegistersPagination | undefined)[] | undefined> {
    const machineRegisters = await this.ormRepository.find({
      relations: ['line','employee'],
      where: { serial_number: Like(`%${serial_number}%`) },
      order: { id: 'DESC' },

    });

    for (let i = 0; i < machineRegisters.length; i ++){
      delete machineRegisters[i].employee.password;
    };


    const registers=[];

    for (let i = 0; i < machineRegisters.length; i ++){
      const id_machine_registers =machineRegisters[i].id

      const machines= machineRegisters[i];
      // eslint-disable-next-line no-await-in-loop
      const modules = await this.findModules(id_machine_registers);


      let obj_machine={...
              machines,
              modules
      };
      registers.push(obj_machine);
    };

    return {
      machineRegisters:registers

    };


  }

  public async findAllMachineRegistersFilter(
    page = 1 ,
    model: string,
    manufacturer: string,
  ): Promise<MachineRegistersPagination> {

    if(model  && manufacturer && manufacturer !=='undefined'){

      const machineRegisters = await this.ormRepository.find({
        where: {model,manufacturer},
        relations: ['line','employee'],
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
      });

      const  totalMachineRegisters = (await this.ormRepository.find({
        where: {model,manufacturer},
      })).length;

      return {
        machineRegisters,
        totalMachineRegisters,
        totalPages:  totalMachineRegisters / TOTAL_PER_PAGE,
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

        const totalMachineRegisters = (await this.ormRepository.find({
          where: {model}
        })).length;

        return {
          machineRegisters,
          totalMachineRegisters,
          totalPages: totalMachineRegisters / TOTAL_PER_PAGE,
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
          const totalMachineRegisters = (await this.ormRepository.find({
            where: {manufacturer}
          })).length;

          return {
            machineRegisters,
            totalMachineRegisters,
            totalPages: totalMachineRegisters / TOTAL_PER_PAGE,
          };

        }



  }

  public async create({
    model,
    description,
    manufacturer,
    serial_number,
    voltage,
    id_line,
    manufacturing_date,
    id_employee,
    status,
    line_layout,

  }: ICreateMachineRegistersDTO): Promise<MachineRegisters> {
    const toolingControl = this.ormRepository.create({
      model,
      description,
      manufacturer,
      serial_number,
      voltage,
      id_line,
      manufacturing_date,
      id_employee,
      status,
      line_layout,

    });

    await this.ormRepository.save(toolingControl);

    return toolingControl;
  }

  public async update(
      id: number,
      model: string,
      description: string,
      manufacturer: string,
      serial_number: string,
      voltage: string,
      id_line: number,
      line_layout:number,
      status:StatusType

  ): Promise<void> {
    await this.ormRepository.createQueryBuilder()
      .update(MachineRegisters)
      .set({model,description,manufacturer,serial_number,voltage,id_line,line_layout,status})
      .where({ id })
      .execute();
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async validationCreate(
    model: string,
    description: string,
    manufacturer: string,
    serial_number: string,
    voltage: string,
    id_line: string,
    status:StatusType,
    line_layout:number,

  ): Promise<MachineRegisters | undefined> {
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


      },
    });

    return findToolgroup;
  }



  public async findAllMachineRegistersList():Promise <MachineRegisters[]> {
    const machineRegisters = await this.ormRepository.find({
      order:{id:'DESC'},
      relations: ['line','employee'],

    });

    return  machineRegisters;
  }


  public async validationSn(
    serial_number: string
  ): Promise<MachineRegisters | undefined> {
    const findToolgroup = await this.ormRepository.findOne({
      where: {
        serial_number
      },
    });

    return findToolgroup;
  }

  public async findAll_line_positions (
    id_line: number
  ): Promise<MachineRegistersPagination[]> {

  const machineRegisters = await this.ormRepository.find({
    where: {
      id_line,
      status:"ACTIVE"
    },
    relations: ['line','employee'],
    order:{line_layout: 'ASC' }

  });

  for (let i = 0; i < machineRegisters.length; i ++){
    delete machineRegisters[i].employee.password;
  };

  const registers=[];

    for (let i = 0; i < machineRegisters.length; i ++){
      const id_machine_registers =machineRegisters[i].id

      const machines= machineRegisters[i];
      // eslint-disable-next-line no-await-in-loop
      const modules = await this.findModules(id_machine_registers);


      let obj_machine={...
              machines,
              modules
      };
      registers.push(obj_machine);
    };

  return {machineRegisters:registers};
}

public async  index_positions():Promise <MachineRegisters[]> {
  const machineRegisters = await this.ormRepository.find({
    order:{id_line:'ASC',line_layout: 'ASC'},
    relations: ['line','employee'],
  });

  return  machineRegisters;
}

public async validationLayoutLine(
  id_line:number,
  line_layout:number,
  status:StatusType

): Promise<MachineRegisters | undefined> {
  const findToolgroup = await this.ormRepository.findOne({
    where: {
      id_line,
      line_layout,
      status:"ACTIVE"
    },
  });

  return findToolgroup;
}

public async validationCheckMachines(
  id:number,
  id_line:number

): Promise<MachineRegisters [] | undefined> {
  const validation_machine = await this.ormRepository
    .createQueryBuilder('machine_registers')
    .select([
      'id as id_machine',
      'serial_number',
      'model',
      'description',
      'manufacturer',
      'id_line'
    ])
    .where({id,id_line})
    .getRawMany();

  return validation_machine;

}

async findModules(
  id_machine_registers: number,
): Promise<MachineRegistersModules[]| undefined> {
  const modules = await this.ormModulesRepository

    .createQueryBuilder('machine_registers_modules')
    .leftJoinAndSelect('machine_registers_modules.modules', 'modules')
    .leftJoinAndSelect('machine_registers_modules.machineRegisters','machineRegisters')
    .select([
      'id_machine_registers',
      'id_module',
      'modules.description as module',
      'machineRegisters.serial_number'
    ])
    .where ({id_machine_registers})
    .getRawMany();

  return modules;
}

async findLines(
  id : number,
): Promise<MachineRegisters[]| undefined> {
  const lines = await this.ormlinesRepository

    .createQueryBuilder('lines')
    .select([
      'id as id_line',
      'line_name'
    ])
    .where ({id})
    .getRawMany();

  return lines;
}

public async machines_per_line(
  id_line:number,
): Promise<MachineRegisters [] | undefined> {
  const line_machines = await this.ormRepository
    .createQueryBuilder('machine_registers')
    .select([
      'id as id_machine',
      'serial_number',
      'model',
      'description',
      'manufacturer',
    ])
    .where({id_line})
    .getRawMany();

  return line_machines;

}

async checkSnModules(
  id_machine_registers: number,
  id_module:number
): Promise<MachineRegistersModules[]| undefined> {
  const modules = await this.ormModulesRepository

    .createQueryBuilder('machine_registers_modules')
    .leftJoinAndSelect('machine_registers_modules.modules', 'modules')
    .leftJoinAndSelect('machine_registers_modules.machineRegisters', 'machineRegisters')
    .select([
      'id_machine_registers',
      'modules.description as module',
      'machineRegisters.serial_number'
    ])
    .where ({id_machine_registers,id_module})
    .getRawMany();

  return modules;
}

public async validationSnModules(
  model:string,
  id_line:number

): Promise<MachineRegisters [] | undefined> {
  const validation_machine = await this.ormRepository
    .createQueryBuilder('machine_registers')
    .select([
      'id as id_machine',
      'serial_number',
      'model',
      'description',
      'manufacturer',
      'id_line'
    ])
    .where({model,id_line})
    .getRawMany();

  return validation_machine;

}

async NameModule(
  description: string,
): Promise<MachineRegistersModules[]| undefined> {
  const module = await this.ormModulesMachinesRepository

    .createQueryBuilder('module_machines')
    .select([
      'id as id_module',
    ])
    .where ({description})
    .getRawMany();

  return module;
}

async deleteModuleUse(
  id_machine_registers:number
): Promise<void> {
  await this.ormModulesRepository
    .createQueryBuilder('machine_registers_modules')
    .update(MachineRegistersModules)
    .set({deleted_at: new Date() })
    .where({id_machine_registers})
    .execute();
}

public async deleteValidation(
  id_machine: number,
): Promise<DowntimeManagement[] > {
  const validation = await this.ormDowntimeManagementRepository
    .createQueryBuilder('dowtime_management')
    .select([
      'id',
      'id_machine'
    ])
    .where({id_machine})
    .getRawMany();

  return validation;
}

public async validation_desciption(
  description:string,
): Promise<MachineRegisters [] | undefined> {
  const validation = await this.ormRepository
    .createQueryBuilder('machine_registers')
    .select([
      'id as id_machine',
      'model',
      'description',
      'manufacturer',
    ])
    .where({description})
    .getRawMany();

  return validation;

}




}




