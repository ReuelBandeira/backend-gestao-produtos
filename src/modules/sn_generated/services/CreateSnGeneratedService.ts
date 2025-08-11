import IProductionOrdersRepository from '@modules/production_orders/repositories/IProductionOrdersRepository';
import IShiftRepository from '@modules/shifts/repositories/IShiftRepository';
import AppError from '@shared/errors/AppError';
import generateStringFromArray from '@shared/util/generateStringFromArray';
import verifyCurrentHour from '@shared/util/verifyCurrentHour';
import { container, inject, injectable } from 'tsyringe';
import ICreateSnGeneratedDTO from '../dtos/ICreateSnGeneratedDTO';
import ISnGeneratedRepository from '../repositories/ISnGeneratedRepository';
import SndFileFtpService from './SendFileFtpService';

interface ArrayComposition {
  type: "factory" | "pcba" | "sequential" | "year" | "month" | "day" | "hour" | "shift"
  value: any
}

@injectable()
export default class CreateSnGeneratedService {
  constructor(
    @inject('SnGeneratedRepository')
    private snGeneratedRepository: ISnGeneratedRepository,

    @inject('ProductionOrdersRepository')
    private productionOrderRepository: IProductionOrdersRepository,

    @inject('ShiftRepository')
    private shiftRepository: IShiftRepository
  ) {}

  async execute(data: ICreateSnGeneratedDTO): Promise<any> {
    const productionOrder = await this.productionOrderRepository.findById(data.id_production_order)

    if (!productionOrder) {
      throw new AppError("ordem de produção não encontrada", 404)
    }

    if (!productionOrder.product.tag) {
      throw new AppError(`Produto ${productionOrder.product.product_name} sem PCBA`, 400)
    }

    const countSequentialByOp = await this.snGeneratedRepository.countByProductionOrder(data.id_production_order)

    const needToBeGenerated = Number(productionOrder.target_qty) - countSequentialByOp

    if (needToBeGenerated === 0) {
      throw new AppError(`Ordem de produção ${productionOrder.mo_code} atingou o número máximo de SN gerados`, 400)
    }

    if (data.quantity_generate > needToBeGenerated) {
      throw new AppError(`Quantidade de seriais a serem gerados é superior a da ordem de produção, faltam ser gerados ${needToBeGenerated}`, 400)
    }

    // Regra de composição
    const composition = productionOrder.product.snComposition
    const arrayOfCompositionFormat = JSON.parse(JSON.stringify(composition.array_format_sn))

    // Ultimo serial cadastrado para o produto
    const lastInsertedByProduct = await this.snGeneratedRepository.findLastInsetByDate(productionOrder.product.product_name)
    const lastSequential = lastInsertedByProduct ? Number(lastInsertedByProduct.sequential) : 0

    // Tamando do sequencial
    const quantitySequantial = arrayOfCompositionFormat.find((item: any) => item.type === "sequential").value

    const shifts = await this.shiftRepository.findAllShifts()

    const currentShift = verifyCurrentHour(shifts)

    if (!currentShift) {
      throw new AppError(`Não há turno cadastrado para esse horário`, 400)
    }

    const arraySerialNumbers: Omit<ICreateSnGeneratedDTO, "quantity_generate">[] = []
    // eslint-disable-next-line no-plusplus
    for (let index = 1; index <= data.quantity_generate; index++) {
      const sequential = String(lastSequential + index).padStart(quantitySequantial, "0")
      const arrayOfSerialNumber = arrayOfCompositionFormat.map((item: any) => {
        let value
        if (item.type === "sequential") {
          value = sequential
        } else if (item.type === "shift") {
          value = currentShift.id
        } else if (item.type === "pcba") {
          value = productionOrder.product.tag
        } else {
          value = item.value
        }

        return {
          ...item,
          value
        }
      })
      const stringSerialNumber = generateStringFromArray(arrayOfSerialNumber)

      arraySerialNumbers.push({
        id_employee: data.id_employee,
        id_production_order: data.id_production_order,
        sequential,
        serial_number: stringSerialNumber
      })
    }

    const snGenerated = await this.snGeneratedRepository.create(arraySerialNumbers)

    const originalString = productionOrder.product.product_name;
    const position = 6; // Posição da substring "SMD" (índice baseado em zero)

    const modifiedString = originalString.substring(0, position) + originalString.substring(position + 3);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedTime = `${hours}${minutes}${seconds}`;

    let txt = `01|${productionOrder.mo_code}||${formattedDate}|${formattedTime}|${modifiedString}\n`
    snGenerated.forEach(item => {
      txt += `04|I|${item.serial_number}\n`
    })

    const sendFileFtp = container.resolve(SndFileFtpService);

    sendFileFtp.execute(txt, productionOrder);

    return { snGenerated: snGenerated.slice(-1), txt };
  }
}
