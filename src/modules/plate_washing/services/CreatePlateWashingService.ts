import ISNDetailRepository from '@modules/sn_detail/repositories/ISNDetailRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { zonedTimeToUtc } from 'date-fns-tz';
import PlateWashing from '../infra/typeorm/entities/PlateWashing';
import IPlateWashingRepository from '../repositories/IPlateWashingRepository';

interface IRequest {
  serial_number: string;
  id_employee: number;
}

@injectable()
export default class CreatePlateWashingService {
  constructor(
    @inject('PlateWashingRepository')
    private plateWashingRepository: IPlateWashingRepository,

    @inject('SNDetailRepository')
    private sNDetailRepository: ISNDetailRepository,


  ) {}

  async execute({serial_number,id_employee}: IRequest): Promise<PlateWashing> {

    const employee = id_employee

    const sn_plate_washing = await this.plateWashingRepository.snPlateWashing(String(serial_number));

    if (sn_plate_washing?.length==0) {
      throw new AppError(`Esse Serial não existe!`);
    }

    const lastsndetail = await this.sNDetailRepository.findSNDetail(serial_number);

      await this.sNDetailRepository.create({
      id_work_station: 2,
      id_employee: employee,
      id_line: lastsndetail[0].id_line,
      mo_number: lastsndetail[0].mo_number,
      model_name: lastsndetail[0].model_name,
      serial_dad: lastsndetail[0].serial_dad,
      serial_number: lastsndetail[0].serial_number,
      serial_raspberry: lastsndetail[0].serial_raspberry,
      solder_paste_serial: lastsndetail[0].solder_paste_serial,
      out_line_time: zonedTimeToUtc(new Date(), 'UTC'),
      in_line_time: zonedTimeToUtc(new Date(), 'UTC'),
      in_station_time: zonedTimeToUtc(new Date(), 'UTC'),
      fase:lastsndetail[0].fase
    });

    const product_name =sn_plate_washing[0].model_name;
    const mo_code=sn_plate_washing[0].mo_number;


    const plates_panel = await this.plateWashingRepository.findProductName(String(product_name));


    const number_plates_panel=plates_panel[0]?.number_plates_panel;


    const production_order = await this.plateWashingRepository.snPoMocode(String(mo_code));

    const input_qty=production_order[0]?.input_qty
    const id_production_order=production_order[0]?.id;
    // adcionado para o router body
    const route_code=production_order[0]?.id_route_code;

    // busca proximo posto obrigatorio: inicio

    // busca proximo posto obrigatorio: fim

    const id_next_workgroup = 4;


    const check_tool_printer = await this.plateWashingRepository.findCheckToolPrinter(Number(id_production_order));
    const code_liste = check_tool_printer[0]?.list_code;

    const components_material_manager = await this.plateWashingRepository.findCompSMTmaterialManager(String(code_liste));

    const id_workstations=2

    const update_tracking_IDobrigatory = await this.plateWashingRepository.updateTrackingsIDobrigatory(String(serial_number),Number(id_workstations),Number(id_next_workgroup));

    const update_sn_detail = await this.plateWashingRepository.updateSnDetail(String(serial_number));

    const update_ProductionOrder = await this.plateWashingRepository.updateProductionOrder(String(mo_code),Number(input_qty),Number(number_plates_panel));

    const createPlateWashing = [];

    for (let i = 0; i < components_material_manager.length; ++i) {

      const objPlateWashing = {

          serial_number_plate:serial_number,
          struct_code: components_material_manager[i].struct_code,
          list_code:components_material_manager[i].list_code,
          main_component:components_material_manager[i].main_components,
          struct_code:components_material_manager[i].struct_code,
          quantity_component:components_material_manager[i].quantity,
          number_plates_panel,
          id_workstations,
          id_employee:employee
      };
      createPlateWashing.push(objPlateWashing);
    }

    const createObjPlateWashing = await this.plateWashingRepository.createPlateWashing(createPlateWashing);

    return createObjPlateWashing;
  }

}
