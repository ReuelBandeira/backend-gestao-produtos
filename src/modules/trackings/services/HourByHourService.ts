/* eslint-disable @typescript-eslint/ban-ts-comment */
import ILineRepository from "@modules/lines/repositories/ILineRepository";
import IShiftRepository from "@modules/shifts/repositories/IShiftRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import ITrackingRepository from "../repositories/ITrackingRepository";

@injectable()
export default class HourByHourService {
  constructor(
    // @ts-ignore
    @inject('ShiftRepository')
    private shiftRepository: IShiftRepository,

    // @ts-ignore
    @inject('TrackingRepository')
    private trackingRepository: ITrackingRepository,

    // @ts-ignore
    @inject('LineRepository')
    private lineRepository: ILineRepository,
  ) {}

  async execute(id_shift: number, id_line: number, date: string): Promise<any> {
    const shift = await this.shiftRepository.findById(id_shift)

    if (!shift) {
      throw new AppError("Turno não encontrado")
    }

    const line = await this.lineRepository.findById(id_line)

    if (!line) {
      throw new AppError(`Linha ${id_line} não encontrada`)
    }

    // Buscar todos os registros para a hora do turno, linha e data
    const startDate = `${date} ${shift.start_hour}`
    const endDate = `${date} ${shift.end_hour}`

    const trackings = await this.trackingRepository.findByHourByHour(id_line, startDate, endDate)

    const arrayHours = this.criarArrayHoras(shift.start_hour, shift.end_hour, line.line_name);

    trackings.forEach(item => {
      const extractHour = this.formatarHoraUTC(new Date(item.tracking_out_line_time))

      const hourInSeconds = this.convertToSeconds(extractHour)

      const indexArray = arrayHours.findIndex(el => hourInSeconds >= el.startSeconds && hourInSeconds < el.endSeconds)

      if (indexArray > -1) {
        arrayHours[indexArray].produced += 1
        arrayHours[indexArray].line_name = item.line_line_name === "" ? "Sem produção" : item.line_line_name
        arrayHours[indexArray].id_line = id_line
        // arrayHours[indexArray].trackings.push(item)

        if (item.target_target > arrayHours[indexArray].planned) {
          arrayHours[indexArray].planned = item.target_target
        }

        if (arrayHours[indexArray].planned < arrayHours[indexArray].produced) {
          arrayHours[indexArray].status = "Dentro do planejado"
        }

        const indextProduct = arrayHours[indexArray].products.findIndex(el => el.product_name === item.product_product_name)
        if (indextProduct > -1) {
          arrayHours[indexArray].products[indextProduct].produced += 1
        } else {
          arrayHours[indexArray].products.push({
            product_name: item.product_product_name,
            description: item.product_description,
            target: item.target_target,
            produced: 1,
          })
        }
      }
    })

    return arrayHours
  }


  private criarArrayHoras(inicio: string, fim: string, line_name: string) {
    const arrayHoras = [];

    const startTime = new Date(`2000-01-01 ${inicio}`);
    const endTime = new Date(`2000-01-01 ${fim}`);

    let currentHour = new Date(startTime);
    currentHour.setMinutes(0);

    while (currentHour <= endTime) {
      const nextHour = new Date(currentHour);
      nextHour.setHours(nextHour.getHours() + 1);

      const formattedInicioTime = this.formatarHora(startTime)
      const formattedFimTime = this.formatarHora(endTime)
      const formattedStartTime = this.formatarHora(currentHour);
      const formattedEndTime = this.formatarHora(nextHour > endTime ? endTime : nextHour);

      if (currentHour.getTime() < startTime.getTime()) {
        arrayHoras.push({
          label: `${formattedInicioTime} - ${formattedEndTime}`,
          startSeconds: this.convertToSeconds(formattedInicioTime),
          endSeconds: this.convertToSeconds(formattedEndTime),
        });
      } else if (nextHour.getTime() === endTime.getTime()) {
        arrayHoras.push({
          label: `${formattedStartTime} - ${formattedFimTime}`,
          startSeconds: this.convertToSeconds(formattedStartTime),
          endSeconds: this.convertToSeconds(formattedFimTime),
        });
      } else {
        arrayHoras.push({
          label: `${formattedStartTime} - ${formattedEndTime}`,
          startSeconds: this.convertToSeconds(formattedStartTime),
          endSeconds: this.convertToSeconds(formattedEndTime),
        });
      }

      currentHour = nextHour;
    }

    return arrayHoras
      .filter(item => item.startSeconds !== item.endSeconds)
      .map(item => ({
        ...item,
        produced: 0,
        planned: 0,
        products: [] as Array<{ product_name: string, description: string, target: number, produced: number }>,
        line_name,
        id_line: 0,
        status: "Abaixo do planejado"
        // trackings: [] as Array<any>
      }));
  }

  private formatarHora(date: Date) {
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  private formatarHoraUTC(date: Date) {
    const horas = String(date.getUTCHours()).padStart(2, '0');
    const minutos = String(date.getUTCMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  private convertToSeconds(hourFull: string) {
    const [hour, minutes] = hourFull.split(":").map(Number);
    return (hour * 3600) + (minutes * 60)
  }
}




