import ICheckToolPrinterRepository from '@modules/check_tool_printer/repositories/ICheckToolPrinterRepository';
import IHistoryMachineSNRepository from '@modules/HistoryMachineSN/repositories/IHistoryMachineSNRepository';
import MaterialManagerRefil from '@modules/material/infra/typeorm/entities/MaterialManagerRefil';
import { MaterialManagerSetup } from '@modules/material/infra/typeorm/entities/MaterialManagerSetup';
import IMaterialManagerRefilRepository from '@modules/material/repositories/IMaterialManagerRefilRepository';
import IMaterialManagerRepository from '@modules/material/repositories/IMaterialManagerRepository';
import IMaterialManagerSetupRepository from '@modules/material/repositories/IMaterialManagerSetupRepository';
import IProductionOrdersRepository from '@modules/production_orders/repositories/IProductionOrdersRepository';
import ISolderPasteControllRepository from '@modules/solder_paste/repositories/ISolderPasteControllRepository';
import ITrackingRepository from '@modules/trackings/repositories/ITrackingRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ISNDetailRepository from '../repositories/ISNDetailRepository';

@injectable()
export default class FindSNDetailService {
  constructor(
    @inject('SNDetailRepository')
    private sNDetailRepository: ISNDetailRepository,

    @inject('TrackingRepository')
    private trackingRepository: ITrackingRepository,

    @inject('ProductionOrdersRepository')
    private productionOrdersRepository: IProductionOrdersRepository,

    @inject('CheckToolPrinterRepository')
    private checkToolPrinterRepository: ICheckToolPrinterRepository,

    @inject('MaterialManagerSetupRepository')
    private materialSetupRepository: IMaterialManagerSetupRepository,

    @inject('MaterialManagerRefilRepository')
    private materialManagerRefilRepository: IMaterialManagerRefilRepository,

    @inject('MaterialManagerRepository')
    private materialManagerRepository: IMaterialManagerRepository,

    @inject('SolderPasteControllRepository')
    private solderPasteControllRepository: ISolderPasteControllRepository,

    @inject('HistoryMachineSNRepository')
    private historyMachineSNRepository: IHistoryMachineSNRepository
  ) {}

  async execute(serial_number: string): Promise<any> {
    const tracking = await this.trackingRepository.checkIfExists(serial_number);

    if (!tracking) {
      throw new AppError('Número de série não encontrado', 404);
    }

    const productionOrder = await this.productionOrdersRepository.findByCodeOp(
      tracking.mo_number
    );

    if (!productionOrder) {
      throw new AppError('Ordem de produção não encontrada', 404);
    }

    const historyMachineSN = await this.historyMachineSNRepository.findBySerialNumber(serial_number)

    const sNDetails = await this.sNDetailRepository.findSNDetail(serial_number);

    const checkToolPrinter =
      await this.checkToolPrinterRepository.findByLineAndProductionOrder(
        tracking.id_line,
        productionOrder.id
      );

    const diffCheckToolPrinter: any[] = [];

    checkToolPrinter.forEach((item) => {
      const existToolControl = diffCheckToolPrinter.find(
        (el) => el.toolingControl?.id === item.toolingControl?.id
      );

      if (!existToolControl) {
        diffCheckToolPrinter.push({
          toolingControl: {
            ...(item.toolingControl || {}), // Ensure object is not null
            toolgroup: {
              ...(item.toolingControl?.toolgroup || {}), // Ensure object is not null
            },
          },
        });
      }

      const existSqueegee = diffCheckToolPrinter.find(
        (el) => el.squeegee?.id === item.squeegee?.id
      );

      if (!existSqueegee) {
        diffCheckToolPrinter.push({
          squeegee: {
            ...(item.squeegee || {}), // Ensure object is not null
          },
        });
      }
    });


    const materialRefil =
      await this.materialManagerRefilRepository.findByListCode(
        checkToolPrinter[0].list_code
      );

    // Filtrar components da tabela de setup e refil para trazer apenas os componentes que realmente
    // foram utilizados no serial. Deve-se usar a data/hora do refil pra fazer o filtro
    const reduceMaterialRefil: MaterialManagerRefil[] = []
    materialRefil.forEach((item) => {
      if (item.created_at <= tracking.created_at) {
        reduceMaterialRefil.push(item)
      }
    })

    const reduceMaterialSetup: MaterialManagerSetup[] = []
    const materialSetup =
      await this.materialSetupRepository.findSetupByListCode(
        checkToolPrinter[0].list_code
      );

    materialSetup.forEach(item => {
      const find = reduceMaterialRefil.find(el => el.component_old === item.component)
      if (!find) {
        reduceMaterialSetup.push(item)
      }
    })

    const reduceMaterialRefilAll: MaterialManagerRefil[] = []
    materialRefil.forEach((item) => {
      const findNew = materialRefil.find(el => el.component_old === item.component_new && el.created_at <= tracking.created_at)
      if (item.created_at <= tracking.created_at && !findNew) {
        reduceMaterialRefilAll.push(item)
      }
    })

    const solderPasteControll =
      await this.solderPasteControllRepository.findBySerial(
        sNDetails[0].solder_paste_serial
      );

    // Remover o prefixo TOP - BOT dos sns da tabela de sn-detail
    // Removendo PL do SN
    const sNDetailsParse = sNDetails.map((item) => {
      const plsn = item.serial_number.split(/[-_]/)[1];
      return {
        ...item,
        serial_number: plsn || item.serial_number,
      };
    });

    // Remover o prefixo TOP - BOT dos sns da tabela de tracking
    // Removendo PL do Tracking
    const pltracking = tracking.serial_number.split(/[-_]/)[1];
    const trackingParse = {
      ...tracking,
      serial_number: pltracking || tracking.serial_number,
    };

    // Buscar na tebela de smt_material_manager a quantiade da BOM baseado na lista
    const materialManager = await this.materialManagerRepository.findByListCodes(checkToolPrinter[0].list_code)
    const materialSetupWithQuantity = reduceMaterialSetup.map(item => {
      const findQuantityInMaterialManager = materialManager.find(el => el.main_components === item.component || el.main_components === item.component)
      return {
        ...item,
        bom_quantity: findQuantityInMaterialManager?.quantity || "N/A"
      }
    })

    const materialRefilWithQuantity = reduceMaterialRefilAll.map(item => {
      const findQuantityInMaterialManager = materialManager.find(el => el.main_components === item.component_new || el.main_components === item.component_new)
      return {
        ...item,
        bom_quantity: findQuantityInMaterialManager?.quantity || "N/A"
      }
    })

    return {
      sNDetails: sNDetailsParse,
      tracking: trackingParse,
      productionOrder,
      checkToolPrinter: diffCheckToolPrinter,
      solderPasteSerial: solderPasteControll,
      materialSetup: materialSetupWithQuantity,
      materialRefil: materialRefilWithQuantity,
      historyMachineSN
    };
  }
}
