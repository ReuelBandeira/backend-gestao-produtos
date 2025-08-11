import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import verifyCurrentHour from '@shared/util/verifyCurrentHour';
import IShiftRepository from '@modules/shifts/repositories/IShiftRepository';
import QuantityCurrentOrder from '../infra/typeorm/entities/QuantityCurrentOrder';
import IQuantityCurrentOrderRepository from '../repositories/IQuantityCurrentOrderRepository';



@injectable()
export default class QuantityCurrentOrderService {
  constructor(
    @inject('QuantityCurrentOrderRepository')
    private quantityCurrentOrderRepository:IQuantityCurrentOrderRepository,
    @inject('ShiftRepository')
    private shiftRepository: IShiftRepository
  ) {}

  async execute(): Promise<QuantityCurrentOrder> {

    // verificação turno

    const shifts = await this.shiftRepository.findAllShifts()

    const currentShift = verifyCurrentHour(shifts)

    if (!currentShift) {
      throw new AppError(`Não há turno cadastrado para esse horário`, 400)
    }

    const turn_current=currentShift.id;

    const startHour=currentShift.start_hour;

    const endHour=currentShift.end_hour;

    // Função para converter uma hora no formato "HH:mm" em minutos
    function convertToMinutes(time) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    }

    // Converter as horas de início e fim em minutos
    const startMinutes = convertToMinutes(startHour);
    const endMinutes = convertToMinutes(endHour);

    // Calcular a diferença em minutos
    const totalMinutes = endMinutes - startMinutes;

    const number_plate= await this.quantityCurrentOrderRepository.numberPlates(String(startHour),String(endHour));

    const target= await this.quantityCurrentOrderRepository.findTarget();

    const status= await this.quantityCurrentOrderRepository.findStatus();

    // Create a function to merge the information from target and number_plate based on "id_line"
    function mergeData(target, number_plate) {
      let mergedData = [];
      target.forEach(targetItem => {
          number_plate.forEach(numberPlateItem => {
              if (targetItem.id_line === numberPlateItem.id_line) {
                  let mergedItem = { ...targetItem, quantidade_placas_aceitas: numberPlateItem.quantidade_placas };
                  mergedData.push(mergedItem);
              }
          });
      });
      return mergedData;
    }

    // Call the mergeData function with target and number_plate as arguments
    let mergedData = mergeData(target, number_plate);

    // Merge the status information with the mergedData based on "id_line"
    mergedData.forEach(mergedItem => {
      status.forEach(statusItem => {
          if (mergedItem.id_line === statusItem.id_line) {
              mergedItem.status = statusItem.status;
          }
      });
    });

    mergedData.forEach((item) => {
      item.target = (item.target / 60) * totalMinutes;
    });

    // Dynamically convert "target" and "quantidade_placas_aceitas" to strings
    for (let i = 0; i < mergedData.length; i++) {
      mergedData[i].target = mergedData[i].target.toString();
      mergedData[i].quantidade_placas_aceitas = mergedData[i].quantidade_placas_aceitas.toString();
    }

    // arredondamento dinamico em targetes

    for (let i = 0; i < mergedData.length; i++) {
      mergedData[i].target = String(Math.round(parseFloat(mergedData[i].target)));
    }

    return ({all_quantity_current_order:mergedData})
  }
}
