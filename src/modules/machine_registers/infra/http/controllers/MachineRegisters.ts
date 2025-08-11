/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import CreateMachineRegistersModulesService from '@modules/machine_registers/services/CreateMachineRegistersModulesService';
import CreateMachineRegistersService from '@modules/machine_registers/services/CreateMachineRegistersService';
import DeleteMachineRegistersService from '@modules/machine_registers/services/DeleteMachineRegistersService';
import UpdateMachineRegistersService from '@modules/machine_registers/services/UpdateMachineRegistersService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import MachineRegistersRepository from '../../typeorm/repositories/MachineRegistersRepository';

export default class MachineRegistersController {




  public async show(request: Request, response: Response): Promise<Response> {
    const { serial_number } = request.query;

    const machineRegistersRepository = new MachineRegistersRepository();

    const machineRegisters= await machineRegistersRepository.findByProductNameSearch(
      String(serial_number),
    );


    return response.json(machineRegisters);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { model,description,manufacturer,serial_number,voltage,id_line,manufacturing_date,status,line_layout,modules} = request.body;
    const { id: id_employee } = request.user;
    const createMachineRegisters = container.resolve(CreateMachineRegistersService);
    const createMachineRegistersModules = container.resolve(CreateMachineRegistersModulesService);

    const serial_numberT = serial_number.toUpperCase()


      const machineRegisters= await createMachineRegisters.execute({
        model,
        description,
        manufacturer,
        serial_number:serial_numberT,
        voltage,
        id_line,
        manufacturing_date,
        id_employee,
        status,
        line_layout,
      });

      const id_machine=machineRegisters.id;

      for(let i = 0; i < modules.length; i++){
        // eslint-disable-next-line no-await-in-loop
        const machineRegistersModules = await createMachineRegistersModules.execute({
          id_machine_registers:id_machine,
          id_module:(modules[i].id_module),
          id_employee
        });
      }



    return response.status(201).json(machineRegisters);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const {model,description,manufacturer,serial_number,voltage,id_line,line_layout, status} = request.body;

    const update = container.resolve(UpdateMachineRegistersService);

    const product = await update.execute({
        id,
        model,
        description,
        manufacturer,
        serial_number,
        voltage,
        id_line,
        line_layout,
        status

    });

    return response.status(201).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteMachinesRegisters = container.resolve(DeleteMachineRegistersService);

    await deleteMachinesRegisters.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async indexAllFilter(request: Request, response: Response): Promise<Response> {
    const { page, model, manufacturer } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const machineRegistersRepository = new MachineRegistersRepository();

    const {
      machineRegisters,
      totalPages,
      totalMachineRegisters,
    } = await machineRegistersRepository.findAllMachineRegistersFilter(
        p,
        String(model),
        String(manufacturer)
      );

    // retirar o password do employes

    for (let i = 0; i < machineRegisters.length; i ++){
      delete machineRegisters[i].employee.password;
    };

    return response.json({
      machineRegisters,
      totalPages,
      totalMachineRegisters,
    });
  }

  public async listMachine_registers(request: Request, response: Response): Promise<Response> {
    const machineRegistersRepository = new MachineRegistersRepository();

    const machineRegisters = await machineRegistersRepository.findAllMachineRegistersList();

    // retirar o password do employes
    for (let i = 0; i < machineRegisters.length; i ++){
      delete machineRegisters[i].employee.password;
    };

    const registers=[];
      for(let i = 0; i < machineRegisters.length; i++){
        const id_machine_registers=machineRegisters[i].id;

        const machines= machineRegisters[i];
        // eslint-disable-next-line no-await-in-loop
        const modules = await machineRegistersRepository.findModules(id_machine_registers);

        let obj_machine={...
          machines,
          modules
        };

        registers.push(obj_machine);

      }



    return response.json({
      machineRegisters:registers
    });
  }

  public async line_positions(request: Request, response: Response): Promise<Response> {
    const {id_line} = request.query;

    const machineRegistersRepository = new MachineRegistersRepository();

    const machine = await machineRegistersRepository.findAll_line_positions(Number(id_line));


    return response.json({
      machine
    });
  }

  public async total_index_positions(request: Request, response: Response): Promise<Response> {
    const machineRegistersRepository = new MachineRegistersRepository();

    const machineRegisters = await machineRegistersRepository.index_positions();

    // retira password do emplyee
    for (let i = 0; i < machineRegisters.length; i ++){
      delete machineRegisters[i].employee.password;
    };

    const registers=[];
      for(let i = 0; i < machineRegisters.length; i++){
        const id_machine_registers=machineRegisters[i].id;

        const machines= machineRegisters[i];
        // eslint-disable-next-line no-await-in-loop
        const modules = await machineRegistersRepository.findModules(id_machine_registers);

        let obj_machine={...
          machines,
          modules
        };

        registers.push(obj_machine);

      }

    return response.json({
      machineRegisters:registers
    });
  }

  public async checkSnMachine (request: Request, response: Response): Promise<Response> {
    const {id,id_line} = request.query;

    const machineRegistersRepository = new MachineRegistersRepository();

    const machineCheck = await machineRegistersRepository.validationCheckMachines(Number(id),Number(id_line));

    const registers=[];
      for(let i = 0; i < machineCheck.length; i++){
        const id_machine_registers=machineCheck[i].id_machine;

        const id_lines = machineCheck[i].id_line;

        const machines= machineCheck[i];
        // eslint-disable-next-line no-await-in-loop
        const modules = await machineRegistersRepository.findModules(id_machine_registers);
        // eslint-disable-next-line no-await-in-loop
        const name_line = await machineRegistersRepository.findLines(Number(id_lines));

        const obj_machine={...
          machines,
          modules,
          name_line
        };

        registers.push(obj_machine);

      }

    return response.json({
      machineCheck:registers
    });
  }


  public async lines(request: Request, response: Response): Promise<Response> {
    const {id} = request.query;

    const machineRegistersRepository = new MachineRegistersRepository();

    const name_line = await machineRegistersRepository.findLines(Number(id));


    return response.json({
      name_line
    });
  }

  public async lines_machines(request: Request, response: Response): Promise<Response> {
    const {id_line} = request.query;

    const machineRegistersRepository = new MachineRegistersRepository();

    const machines_lines = await machineRegistersRepository.machines_per_line(Number(id_line));

    return response.json({
      machines_lines
    });
  }

  public async checkModuleMachine(request: Request, response: Response): Promise<Response> {
    const {id_machine_registers,id_module} = request.query;

    const machineRegistersRepository = new MachineRegistersRepository();

    const checkModule = await machineRegistersRepository.checkSnModules(Number(id_machine_registers),Number(id_module));


    return response.json({
      checkModule
    });
  }


  public async SnMachineModule (request: Request, response: Response): Promise<Response> {
    const {model,id_line} = request.query;

    const machineRegistersRepository = new MachineRegistersRepository();

    const machineCheck = await machineRegistersRepository.validationSnModules(String(model),Number(id_line));

    const registers=[];
      for(let i = 0; i < machineCheck.length; i++){
        const id_machine_registers=machineCheck[i].id_machine;

        const id_lines = machineCheck[i].id_line;

        const machines= machineCheck[i];
        // eslint-disable-next-line no-await-in-loop
        const modules = await machineRegistersRepository.findModules(id_machine_registers);
        // eslint-disable-next-line no-await-in-loop
        const name_line = await machineRegistersRepository.findLines(Number(id_lines));

        const obj_machine={...
          machines,
          modules,
          name_line
        };

        registers.push(obj_machine);

      }

    return response.json({
      machineCheck:registers
    });

  }

  public async findNameModule(request: Request, response: Response): Promise<Response> {
    const {description} = request.query;

    const machineRegistersRepository = new MachineRegistersRepository();

    const nameModule = await machineRegistersRepository.NameModule(String(description));


    return response.json({
      nameModule
    });
  }

  public async validationDescription(request: Request, response: Response): Promise<Response> {
    const {description} = request.query;

    const machineRegistersRepository = new MachineRegistersRepository();

    const validation_machine = await machineRegistersRepository.validation_desciption(String(description));

    if (validation_machine?.length == 0) {
      throw new AppError(`Máquina não encontrada.Favor verificar!`);
    }

    return response.json({
      validation_machine
    });
  }



}
