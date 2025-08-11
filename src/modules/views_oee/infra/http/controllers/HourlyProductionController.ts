import { Tracking } from '@modules/trackings/infra/typeorm/entities/Tracking';
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
// eslint-disable-next-line import/extensions
import verifyCurrentHour from '@shared/util/verifyCurrentHour';
import AppError from '@shared/errors/AppError';
import HourlyProductionRepository from '../../typeorm/repositories/HourlyProductionRepository';
import HourlyProduction from '../../typeorm/entities/HourlyProduction';
import ProductController from '@modules/products/infra/http/controllers/ProductController';



export default class HourlyProductionController {


  public async findLinesHourlyProduction(request: Request, response: Response): Promise<Response> {
    const { lines } = request.body;

    const model = new HourlyProductionRepository();

    const oee = await model.findAllViewsLinesHourlyProduction();

    // eslint-disable-next-line no-shadow
    function criarObjetosPorIdLine(oee: string | any[] | HourlyProduction) {
      const objetosSeparados = {};

      for (let i = 0; i < oee.length; i++) {
        const idLine = oee[i].id_line;

        if (!objetosSeparados[idLine]) {
          objetosSeparados[idLine] = [];
        }

        objetosSeparados[idLine].push(oee[i]);
      }

      return objetosSeparados;
    }

    const objetosSeparados = criarObjetosPorIdLine(oee);

    function compararHoras(objetos: { [x: string]: { id_line: any; line_name: any; hora: any; quantidade_placas: string; target: string; }[]; }) {
      const todasHoras: unknown[] = [];

      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in objetos) {
        objetos[key].forEach((item: { hora: unknown; }) => {
          todasHoras.push(item.hora);
        });
      }
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in objetos) {
        const horasObjeto = objetos[key].map((item: { hora: unknown; }) => item.hora);

        todasHoras.forEach(hora => {
          if (!horasObjeto.includes(hora)) {
            const objetoFaltante = objetos[key][0];
            const novoObjeto = {
              id_line: objetoFaltante.id_line,
              line_name: objetoFaltante.line_name,
              hora,
              quantidade_placas: "N/A",
              target: "N/A"
            };

            // Verifica se o novo objeto já existe no array antes de adicioná-lo
            if (!objetos[key].some((item: { hora: unknown; }) => item.hora === hora)) {
              objetos[key].push(novoObjeto);
            }
          }
        });
      }

      return objetos;
    }

    const resultado = compararHoras(objetosSeparados);
    const resultadoArray = Object.values(resultado).flat();

    const id_line_hourly_Production = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const line of lines) {
      const { id_line } = line;
      // eslint-disable-next-line func-names
      const list = resultadoArray.filter(function (item: { id_line: unknown; }) {
        // eslint-disable-next-line eqeqeq
        return (item.id_line == id_line);
      });
      id_line_hourly_Production.push(...list);
    }

    return response.json({
      id_line_hourly_Production
    });
  }


  public async allLines(request: Request, response: Response): Promise<Response> {

    const model = new HourlyProductionRepository();

    const oee = await model.findAllViewsLinesHourlyProduction();

    // eslint-disable-next-line no-shadow
    function criarObjetosPorIdLine(oee: string | any[] | HourlyProduction) {
      const objetosSeparados = {};

      for (let i = 0; i < oee.length; i++) {
        const idLine = oee[i].id_line;

        if (!objetosSeparados[idLine]) {
          objetosSeparados[idLine] = [];
        }

        objetosSeparados[idLine].push(oee[i]);
      }

      return objetosSeparados;
    }

    const objetosSeparados = criarObjetosPorIdLine(oee);

    function compararHoras(objetos: { [x: string]: { id_line: any; line_name: any; hora: any; quantidade_placas: string; target: string; }[]; }) {
      const todasHoras: unknown[] = [];

      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in objetos) {
        objetos[key].forEach((item: { hora: unknown; }) => {
          todasHoras.push(item.hora);
        });
      }
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in objetos) {
        const horasObjeto = objetos[key].map((item: { hora: unknown; }) => item.hora);

        todasHoras.forEach(hora => {
          if (!horasObjeto.includes(hora)) {
            const objetoFaltante = objetos[key][0];
            const novoObjeto = {
              id_line: objetoFaltante.id_line,
              line_name: objetoFaltante.line_name,
              hora,
              quantidade_placas: "N/A",
              target: "N/A"
            };

            // Verifica se o novo objeto já existe no array antes de adicioná-lo
            if (!objetos[key].some((item: { hora: unknown; }) => item.hora === hora)) {
              objetos[key].push(novoObjeto);
            }
          }
        });
      }

      return objetos;
    }

    const resultado = compararHoras(objetosSeparados);
    const resultadoArray = Object.values(resultado).flat();


    return response.json({
      all_hourly_Production: resultadoArray
    });
  }

  public async allLinesOEERegisters(request: Request, response: Response): Promise<Response> {

    const model = new HourlyProductionRepository();

    const oee = await model.findAllViewsLinesHourlyProduction();

    function getUniqueRecords(arr: any[] | HourlyProduction) {
      const uniqueRecords: { id_line: any; line_name: any; }[] = [];

      arr.forEach((item: { id_line: any; line_name: any; }) => {
        const { id_line, line_name } = item;
        const existingRecord = uniqueRecords.find(
          (record) => record.id_line === id_line && record.line_name === line_name
        );

        if (!existingRecord) {
          uniqueRecords.push({ id_line, line_name });
        }
      });

      return uniqueRecords;
    }

    const uniqueRecords = getUniqueRecords(oee);

    return response.json({
      lines_oee: uniqueRecords
    });
  }

  public async allLinesOEERegistersTarget(request: Request, response: Response): Promise<Response> {

    const model = new HourlyProductionRepository();

    const oee_target = await model.findAllViewsLinesHourlyProduction();

    const registers = [];
    for (let i = 0; i < oee_target.length; i++) {

      const id_line = oee_target[i].id_linha;

      // eslint-disable-next-line no-await-in-loop
      const targets = await model.findToolPrinter(Number(id_line));
      let target = 0;
      if (targets.length === 0) {
        target = 0;
      } else {
        target = targets[0].target;
      };

      const register_oee_target = oee_target[i];

      const obj = {
        ...
        register_oee_target,
        target
      };
      registers.push(obj);
    }

    return response.json({
      oee_target: registers
    });
  }

  public async multipleLinesOEERegistersTarget(request: Request, response: Response): Promise<Response> {

    const { lines } = request.body;

    const model = new HourlyProductionRepository();

    const oee_target = await model.findAllViewsLinesHourlyProduction();

    const registers = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < oee_target.length; i++) {

      const id_line = oee_target[i].id_linha;

      // eslint-disable-next-line no-await-in-loop
      const targets = await model.findToolPrinter(Number(id_line));

      let target = 0;
      if (targets.length === 0) {
        target = 0;
      } else {
        target = targets[0].target;
      };

      const register_oee_target = oee_target[i];

      const obj = {
        ...
        register_oee_target,
        target
      };
      registers.push(obj);
    }

    const id_line_hourly_Production = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const line of lines) {
      const { id_line } = line;
      // eslint-disable-next-line func-names, no-loop-func
      const list = registers.filter(function (item: { id_linha: unknown; }) {
        // eslint-disable-next-line eqeqeq
        return (item.id_linha == id_line);
      });
      id_line_hourly_Production.push(...list);
    }

    return response.json({
      multiple_lines_oee: id_line_hourly_Production
    });
  }

  public async lineOEERegistersTarget(request: Request, response: Response): Promise<Response> {

    const { id_line } = request.query;

    const model = new HourlyProductionRepository();

    // verificação turno

    const shifts = await model.findAllShifts()

    const currentShift = verifyCurrentHour(shifts)

    if (!currentShift) {
      throw new AppError(`Não há turno cadastrado para esse horário`, 400)
    }

    const turn_current = currentShift.id;

    const startHour = currentShift.start_hour;

    const endHour = currentShift.end_hour;

    const all_oee_detail = await model.findAllViewsLinesHourlyProductionDetail();

    const all_oee_target = await model.findAllViewsLinesHourlyProduction();

    const oee_detail = all_oee_detail.filter((item) => item.turno === Number(currentShift.id));

    const oee_target = all_oee_target.filter((item) => item.turno === Number(currentShift.id));


    const registers = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < oee_target.length; i++) {

      const id_line = oee_target[i].id_linha;

      // eslint-disable-next-line no-await-in-loop
      const targets = await model.findToolPrinter(Number(id_line));

      let target = 0;
      let product_name = "N.A";
      let description = "N.A";
      let mo_code = "N.A";
      let number_plates_panel = 0;

      if (targets.length === 0) {
        target = 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        product_name = "N.A";
        description = "N.A";
        mo_code = "N.A";


      } else {
        target = targets[0].target;
        product_name = targets[0].product_name;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        description = targets[0].description;
        mo_code = targets[0].mo_code;
        number_plates_panel = targets[0].number_plates_panel;
      };

      const register_oee_target = oee_target[i];

      const obj = {
        ...
        register_oee_target,
        number_plates_panel,
        target,
        product_name,
        description,
        mo_code
      };
      registers.push(obj);
    }

    // todos os serias do detalhe
    const filteredIdlineDetail = oee_detail.filter((item) => item.id_line === Number(id_line));

    if (filteredIdlineDetail.length === 0) {
      throw new AppError(`Não há produção para está linha, por gentileza informar outra linha !`, 400)
    }

    const total_scrap = [];
    const total_id_trackings = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < filteredIdlineDetail.length; i++) {

      const number_serial = filteredIdlineDetail[i].serial_number;
      // eslint-disable-next-line no-await-in-loop
      const scrap = await model.findSerialScraps(String(number_serial), String(startHour), String(endHour));
      // eslint-disable-next-line no-await-in-loop
      const trackings = await model.findIDTrackings(String(number_serial), String(startHour), String(endHour));
      total_id_trackings.push(...trackings)
      total_scrap.push(...scrap);
    }

    // total scrap
    let scrap_balances = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total_scrap.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      scrap_balances += total_scrap[i].material_quantity;
    }

    // total reparo
    const total_repairs = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total_id_trackings.length; i++) {
      const id = total_id_trackings[i].id_tracking;
      // eslint-disable-next-line no-await-in-loop
      const repairs = await model.findRepairs(Number(id), String(startHour), String(endHour));
      total_repairs.push(...repairs);
    }

    const total_failures = total_repairs.length;

    const filterNotRepaired = total_repairs.filter((item) => item.date_repair === null);

    const total_repaired = total_failures - filterNotRepaired.length;

    const filteredIdline = registers.filter((item) => item.id_linha === Number(id_line));

    // logica aplicavel ao 1 e 2 turno ignora o ultimo horario : inicio
    // eslint-disable-next-line no-bitwise

    function addOneHour(timeString: string) {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      let newHours = hours + 1;
      if (newHours === 24) newHours = 0; // Loop back to 00:00:00 if it reaches midnight
      return `${String(newHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    if (turn_current === 1) {
      for (let i = 0; i < filteredIdline.length; i++) {
        if (i === filteredIdline.length - 1) {
          filteredIdline[i].hora = "14:00:00-14:20:00"; // Set default value for the last record
        }
        else {
          const startTime = filteredIdline[i].hora;
          const endTime = addOneHour(startTime);
          filteredIdline[i].hora = `${startTime}-${endTime}`;
        }
      }
    }
    if (turn_current === 2) {

      for (let i = 0; i < filteredIdline.length; i++) {
        if (i === filteredIdline.length - 1) {
          filteredIdline[i].hora = "22:00:00-22:35:00"; // Set default value for the last record
        }
        else {
          const startTime = filteredIdline[i].hora;
          const endTime = addOneHour(startTime);
          filteredIdline[i].hora = `${startTime}-${endTime}`;
        }
      }
    }

    // logica aplicavel ao 1 e 2 turno ignora o ultimo horario : fim;

    // logica primeiro horario 1 e 3 turno: inicio;
    if (turn_current === 2) {
      filteredIdline[0].hora = "14:20:00-15:00:00";
    }

    if (turn_current === 3) {
      filteredIdline[0].hora = "22:35:00-23:00:00";
    }
    // logica primeiro horario 1 e 3 turno: fim;

    // regra adcionada para os valores onde o intervalo de hora não for 60 min: inicio
    // Function to calculate the difference in minutes between two time strings
    function getMinutesDiff(start, end) {
      const startTime = new Date(`2000-01-01 ${start}`);
      const endTime = new Date(`2000-01-01 ${end}`);
      const diffInMs = endTime - startTime;
      return diffInMs / 1000 / 60; // Convert milliseconds to minutes
    }

    // Loop through each entry in the filteredIdline array
    for (let i = 0; i < filteredIdline.length; i++) {
      const currentEntry = filteredIdline[i];

      // Split the hora string to get start and end time
      const [startTime, endTime] = currentEntry.hora.split("-");

      // Calculate the difference in minutes
      const minutesDiff = getMinutesDiff(startTime, endTime);

      // Check if the difference is not 60 minutes
      if (minutesDiff !== 60) {
        // Update the target property with the new value
        currentEntry.target = (currentEntry.target / 60) * minutesDiff;
      }
    }
    // regra adcionada para os valores onde o intervalo de hora não for 60 min: fim

    // Round the "target" property for each object in the array
    filteredIdline.forEach(item => {
      item.target = Math.round(item.target);
    });

    // planejado
    let planned = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < filteredIdline.length; i++) {
      planned += filteredIdline[i].target;
    }

    
    // produzido
    let produced = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < filteredIdline.length; i++) {
      const quantidade = parseInt(filteredIdline[i].quantidade_placa)* parseInt(filteredIdline[i].number_plates_panel);
      produced += quantidade;
    }

    // porcentagens
    let failures_percentage = "0.00";
    let meta_shift_percentage = "0.00";

    if (planned === 0 || produced === 0) {
      failures_percentage = "0.00";
      meta_shift_percentage = "0.00";
    } else {
      const failures = (total_failures / produced) * 100;
      failures_percentage = failures.toFixed(2);

      const meta_shift = (produced / planned) * 100;
      meta_shift_percentage = meta_shift.toFixed(2);
    }



    return response.json({
      oee_idLine_target: filteredIdline,
      total_failures,
      total_repaired,
      planned,
      produced,
      scrap_balances,
      failures_percentage,
      meta_shift_percentage
    });
  }



}


