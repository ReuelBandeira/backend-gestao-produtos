import { Type } from '@modules/type_downtime/infra/typeorm/entities/Type';
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import CreateDowntimeManagementService from '@modules/downtime_management/services/CreateDowntimeManagementService';
// eslint-disable-next-line import/no-unresolved
import DeleteDowntimeManagementService from '@modules/downtime_management/services/DeleteDowntimeManagementService';
// eslint-disable-next-line import/no-unresolved
import UpdateDowntimeManagementService from '@modules/downtime_management/services/UpdateDowntimeManagementService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DowntimeManagementRepository from '../../typeorm/repositories/DowntimeManagementRepository';
// eslint-disable-next-line import/order
import CreateDowntimeCheckinService from '@modules/downtime_management/services/CreateDowntimeCheckinControlService';
import SendSlackService from '@modules/messenger/services/SendSlackService';
import SendEmailService from '@modules/messenger/services/SendEmailService';

export default class DowntimeManagementController {


  public async show(request: Request, response: Response): Promise<Response> {
    const {id_department} = request.query;

    const downtimeManagementRepository = new DowntimeManagementRepository();

    const machineRegisters= await downtimeManagementRepository.findByProductNameSearch(
      Number(id_department)
    );



    return response.json(machineRegisters);
  }

  // merge para RELEASE

  public async create(request: Request, response: Response): Promise<Response> {
    const { id_department,id_type,reason,stop_start_date,id_line,id_machine,equipment,id_cause,module,final_stop_date,status,name_machine,id_employee_checkin,date_accompanying_checkin,serial_number,component,id_action,comment,zone_type,post} = request.body;
    const { id: id_employee } = request.user;
    const createDowntimeManagement = container.resolve(CreateDowntimeManagementService);

    const serial_numberT = serial_number.toUpperCase()

    const createSlack = container.resolve(SendSlackService);

    const createEmail = container.resolve(SendEmailService);

      const downtimeManagement= await createDowntimeManagement.execute({
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
        serial_number:serial_numberT,
        component,
        id_action,
        comment,
        zone_type,
        post
      });

      const downtimeManagementRepository = new DowntimeManagementRepository();

        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        const name_employee = employee.map((value) => value.username);

        const machines = await downtimeManagementRepository.findMachine(Number(id_machine));

        const name_machines = machines.map((value) => value.model);

        const line = await downtimeManagementRepository.findLine(Number(id_line));

        const line_name = line.map((value) => value.line_name);

        const date = new Date(stop_start_date);

        const refactor_date=(date.toLocaleDateString());

        const date_deivision = stop_start_date.split('T');

        const time =date_deivision[1];

        const date_final = `${refactor_date  } ${  time}`;

        const id_register= downtimeManagement.id;

        const email_employes = await downtimeManagementRepository.findEmaisUserSMT();

        const list_email = email_employes?.filter(function(item){
          return (item.email !== ''  && item.email !== null );
        });

        const only_name = list_email?.map((value) => value.username);

        const objEmail = []
        for (let i = 0; i < only_name.length; i++) {
          const list = list_email.filter(function(item) {
            return (item.username == only_name[i]);
          });
              for (let i = 0; i < 1; i++) {
                // eslint-disable-next-line vars-on-top, no-var
                var no_duplication = {
                    names_emais: `${list[i].username  } <${list[i].email  }>`
                }

              };
              objEmail.push(no_duplication);
        };

      const format_email = objEmail.map((value) => value.names_emais);

      if(name_machines.length!==0 && zone_type == "SMT") {
        const mensagem= await createSlack.execute({
          id: downtimeManagement.id,
          line:line_name,
          machine:name_machines,
          module,
          reason,
          material:component,
          stop_date:date_final,
          employee:name_employee,
          status
        });
        const message= await createEmail.execute({
          subject: "🚨 DOWNTIME EM ABERTO !!",
          context: {
            title: "🚨 DOWNTIME ABERTO !" ,
            content: ` Máquina ⚙️ ${name_machines} de modulo 🔍 ${module} parada na linha 📌 ${line_name}, sinalizada pelo usuario(a) 👤 ${name_employee} por motivo de 🏷️ ${reason} ,data de parada : 📆  ${date_final} com 🆔 ID :${id_register} !`
          },
          to:format_email
        });
      };

      return response.status(201).json({downtimeManagement});
  }

// update checkin

  public async update(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;

    const { id: id_employee } = request.user;

    const { zone_type,status,date_accompanying_checkin,type} = request.body;

    const downtimeManagementRepository = new DowntimeManagementRepository();

    const history_checkin = await downtimeManagementRepository.validationEmployeeCheckin(Number(id));
    // eslint-disable-next-line no-multi-assign
    const validation_checkin = history_checkin[0].id_employee_checkin;

    const validation_employee = validation_checkin == id_employee;

    if (validation_employee == true) {
      throw new AppError(`Esse usuário já é o ultimo Técnico SMT que realizou o checkin, não sendo permitido um chekin consecutivo. Favor verificar!`);
    }

    const update = container.resolve(UpdateDowntimeManagementService);

    const create_checkin_control = container.resolve(CreateDowntimeCheckinService);

    const downtime = await update.execute({
      id,
      zone_type,
      id_employee,
      status,
      date_accompanying_checkin,
      type
    });

    const downtime_checkin_control = await create_checkin_control.execute({
      id,
      zone_type,
      id_employee,
      status,
      date_accompanying_checkin,
      type

    });

    return response.status(201).json({downtime,downtime_checkin_control});
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);



    const deleteDowntimeManagement = container.resolve(DeleteDowntimeManagementService);

    await deleteDowntimeManagement.execute({ id: parsedId });

    return response.status(204).json({});
  }


  public async listMachine_registers(request: Request, response: Response): Promise<Response> {
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const downtimeManagement = await downtimeManagementRepository.findRegisters();



    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        const history_checkin = await downtimeManagementRepository.findHistoryCheckin(Number(id_downtime));

        const total_checkin = history_checkin?.length;

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines,
          history_checkin,
          total_checkin

        };
        registers.push(obj_machine);
      }

    return response.json({
      downtimeManagement:registers
    });
  }

  public async checkTypeUser(request: Request, response: Response): Promise<Response> {
    const {id_employee_checkin} = request.query;

    const checkUserRepository = new DowntimeManagementRepository();

    const check_user = await checkUserRepository.userCheckType(Number(id_employee_checkin));

    return response.json({
      check_user
    });
  }


  public async ReportDonwtimeFollow_up(request: Request, response: Response): Promise<Response> {

    const {dateStart,dateEnd} = request.query;
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const downtimeManagement = await downtimeManagementRepository.findReportDonwtimefollowUp(dateStart,dateEnd);



    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines
        };
        registers.push(obj_machine);
      }

    return response.json({
      ReportDonwtimefollowUp:registers
    });
  }


  public async ReportDonwtimeOpening(request: Request, response: Response): Promise<Response> {

    const {dateStart,dateEnd} = request.query;
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const downtimeManagement = await downtimeManagementRepository.findReportDonwtimeOpening(dateStart,dateEnd);



    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines
        };
        registers.push(obj_machine);
      }

    return response.json({
      ReportDonwtimeOpening:registers
    });
  }


  public async ReportDonwtimeFinalized(request: Request, response: Response): Promise<Response> {

    const {dateStart,dateEnd} = request.query;
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const downtimeManagement = await downtimeManagementRepository.findReportDonwtimeFinalized(dateStart,dateEnd);

    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines
        };
        registers.push(obj_machine);
      }

    return response.json({
      ReportDonwtimeFinalized:registers
    });
  }

// update checkin

  public async updateFinalize(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const {final_stop_date,status,comment,id_cause,id_action,zone_type,type} = request.body;

    const { id: id_employee } = request.user;

    const downtimeManagementRepository = new DowntimeManagementRepository();

    const validationFinalize = await downtimeManagementRepository.validationEmployeeCheckin(Number(id));
    const id_validationFinalize=validationFinalize[0].id_employee_checkin;


    const check_type_user = await downtimeManagementRepository.validationUserType(
      id_employee,
    );
    const validation_type = check_type_user?.length;

    const validation_employee = id_validationFinalize == id_employee;


    if (zone_type =="SMT" && type == "Equipamento" && validation_employee == false) {
      throw new AppError(`Esse usuário não tem permissão para essa execução, somente o Técnico SMT que realizou o ultimo checkin. Favor verificar!`);
    }


    const downtimeFinalized= await downtimeManagementRepository.updateFinalized(
      Number(id),
      Number(id_employee),
      String(final_stop_date),
      String(status),
      String(comment),
      Number(id_cause),
      Number(id_action)
    );

    return response.json(downtimeFinalized);
  }

  public async listDonwtime_registers_pagination (request: Request, response: Response): Promise<Response> {
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      downtimeManagement,
      totalPages,
      totalRegisters} = await downtimeManagementRepository.findRegistersDowntimePagination(p);


    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        // eslint-disable-next-line no-await-in-loop
        const history_checkin = await downtimeManagementRepository.findHistoryCheckin(Number(id_downtime));

        const total_checkin = history_checkin?.length;

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines,
          history_checkin,
          total_checkin

        };
        registers.push(obj_machine);
      }



    return response.json({
      downtimeManagementPagination:registers,
      totalPages,
      totalRegisters

    });
  }

  public async filterDowntimeMachines (request: Request, response: Response): Promise<Response> {
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const {id_machine} = request.query;

    const downtimeManagement = await downtimeManagementRepository.filterMachineDowntime(Number(id_machine));

    if (downtimeManagement?.length==0) {
      throw new AppError(`Não existe registro para essa Máquina!`);
    }

    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines
        };
        registers.push(obj_machine);
      }

    return response.json({
      filter_machine_downtime:registers
    });
  }

  public async filterDowntimeReason (request: Request, response: Response): Promise<Response> {
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const {reason} = request.query;

    const downtimeManagement = await downtimeManagementRepository.findFilterDowntimeReason(String(reason));

    if (downtimeManagement?.length==0) {
      throw new AppError(`Não existe esse motivo registrado!`);
    }

    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines
        };
        registers.push(obj_machine);
      }

    return response.json({
      filter_reason_downtime:registers
    });
  }

  public async filterDowntimeCause(request: Request, response: Response): Promise<Response> {
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const {id_cause} = request.query;

    const downtimeManagement = await downtimeManagementRepository.findFilterDowntimeCause(Number(id_cause));

    if (downtimeManagement?.length==0) {
      throw new AppError(`Não existe essa causa registrada!`);
    }

    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines
        };
        registers.push(obj_machine);
      }

    return response.json({
      filter_cause_downtime:registers
    });
  }

  public async filterDowntimeAction(request: Request, response: Response): Promise<Response> {
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const {id_action} = request.query;

    const downtimeManagement = await downtimeManagementRepository.findFilterDowntimeAction(Number(id_action));

    if (downtimeManagement?.length==0) {
      throw new AppError(`Não existe essa ação registrada!`);
    }

    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines
        };
        registers.push(obj_machine);
      }

    return response.json({
      filter_action_downtime:registers
    });
  }

  public async filterDowntimeLine(request: Request, response: Response): Promise<Response> {
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const {id_line} = request.query;

    const downtimeManagement = await downtimeManagementRepository.findFilterDowntimeLine(Number(id_line));

    if (downtimeManagement?.length==0) {
      throw new AppError(`Não existe essa linha registrada!`);
    }

    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines
        };
        registers.push(obj_machine);
      }

    return response.json({
      filter_line_downtime:registers
    });
  }

  public async filterDowntimeComment(request: Request, response: Response): Promise<Response> {
    const downtimeManagementRepository = new DowntimeManagementRepository();

    const {comment} = request.query;

    const downtimeManagement = await downtimeManagementRepository.findFilterDowntimeComment(String(comment));

    if (downtimeManagement?.length==0) {
      throw new AppError(`Não existe esse comentario registrado!`);
    }

    const registers=[];
      for(let i = 0; i < downtimeManagement.length; i++){

        const id_downtime=downtimeManagement[i].id;
        const id_employee=downtimeManagement[i].id_employee
        const id_name_checkin=downtimeManagement[i].id_employee_checkin;
        const id_name_closed=downtimeManagement[i].id_employee_closed;
        const id_actions=downtimeManagement[i].id_action;
        const id_causes=downtimeManagement[i].id_cause;
        const id_departaments=downtimeManagement[i].id_department;
        const id_types=downtimeManagement[i].id_type;
        const id_lines=downtimeManagement[i].id_line;
        const id_machines=downtimeManagement[i].id_machine;

        // eslint-disable-next-line no-await-in-loop
        const employee = await downtimeManagementRepository.findEmployee(Number(id_employee));

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_name_checkin));

        // // eslint-disable-next-line no-await-in-loop, no-await-in-loop, no-await-in-loop
        const name_user_closed = await downtimeManagementRepository.findEmployee(Number(id_name_closed));

        // eslint-disable-next-line no-await-in-loop
        const action = await downtimeManagementRepository.findAction(Number(id_actions));

        // eslint-disable-next-line no-await-in-loop
        const cause = await downtimeManagementRepository.findCause(Number(id_causes));

        // eslint-disable-next-line no-await-in-loop
        const departament = await downtimeManagementRepository.findDepartament(Number(id_departaments));

        // eslint-disable-next-line no-await-in-loop
        const type = await downtimeManagementRepository.findType(Number(id_types));

        // eslint-disable-next-line no-await-in-loop
        const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const machines = await downtimeManagementRepository.findMachine(Number(id_machines));

        // eslint-disable-next-line no-await-in-loop
        const times = await downtimeManagementRepository.stop_time(id_downtime);

        const downtime= downtimeManagement[i];

        let obj_machine={...
          downtime,
          times,
          employee,
          name_user_checkin,
          name_user_closed,
          action,
          cause,
          departament,
          type,
          line,
          machines
        };
        registers.push(obj_machine);
      }

    return response.json({
      filter_comment_downtime:registers
    });
  }

  public async allMachines(request: Request, response: Response): Promise<Response> {

    const downtimeManagementRepository = new DowntimeManagementRepository();

    const machines_registers = await downtimeManagementRepository.findRegistersMachinesAll();

    const registers=[];
      for(let i = 0; i < machines_registers.length; i++){

        // const id_downtime=machines[i].id;

        // const id_lines=machines[i].id_line;
        const id_machines=machines_registers[i].id_machine;

        // const line = await downtimeManagementRepository.findLine(Number(id_lines));

        // eslint-disable-next-line no-await-in-loop
        const modules = await downtimeManagementRepository.findModules(Number(id_machines));

        // eslint-disable-next-line no-use-before-define
        const registerMachines= machines_registers[i];

        let obj_machine={...
          registerMachines,
          modules
        };
        registers.push(obj_machine);
      }

    return response.json({
      machines_downtimes:registers
    });
  }

  public async allReasons(request: Request, response: Response): Promise<Response> {

    const downtimeManagementRepository = new DowntimeManagementRepository();

    const reasons_registers = await downtimeManagementRepository.findRegistersReasonAll();

    return response.json({
      reasons_registers
    });
  }

  public async allCauses(request: Request, response: Response): Promise<Response> {

    const downtimeManagementRepository = new DowntimeManagementRepository();

    const causes_registers = await downtimeManagementRepository.findRegistersCauseAll();

    return response.json({
      causes_registers
    });
  }

  public async allActions(request: Request, response: Response): Promise<Response> {

    const downtimeManagementRepository = new DowntimeManagementRepository();

    const actions_registers = await downtimeManagementRepository.findRegistersActionAll();

    return response.json({
      actions_registers
    });
  }

  public async allLines(request: Request, response: Response): Promise<Response> {

    const downtimeManagementRepository = new DowntimeManagementRepository();

    const lines_registers = await downtimeManagementRepository.findRegistersLineAll();

    return response.json({
      lines_registers
    });
  }

  public async allComments(request: Request, response: Response): Promise<Response> {

    const downtimeManagementRepository = new DowntimeManagementRepository();

    const comments_registers = await downtimeManagementRepository.findRegistersCommentAll();

    return response.json({
      comments_registers
    });
  }

  public async checkinHistory(request: Request, response: Response): Promise<Response> {

    const {id_downtime} = request.query;

    const downtimeManagementRepository = new DowntimeManagementRepository();

    const history_checkin = await downtimeManagementRepository.findHistoryCheckin(Number(id_downtime));

    const registers=[];
      for(let i = 0; i < history_checkin.length; i++){

        const id_user= history_checkin[i].id_employee_checkin;

        // eslint-disable-next-line no-await-in-loop
        const name_user_checkin = await downtimeManagementRepository.findEmployee(Number(id_user));
        // eslint-disable-next-line no-use-before-define
        const registerMachines= history_checkin[i];

        const history_checkin_downtime={...
          registerMachines,
          name_user_checkin
        };
        registers.push(history_checkin_downtime);
      }

    const total_checkin = registers.length;

    return response.json({
      history_checkin:registers,
      total_checkin
    });
  }


}
