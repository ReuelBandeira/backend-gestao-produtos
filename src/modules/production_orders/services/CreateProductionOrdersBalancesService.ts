import ICreateBomDTO from '@modules/bom/dtos/ICreateBomDTO';
import { Bom } from '@modules/bom/infra/typeorm/entities/Bom';
import ICheckToolPrinterRepository from '@modules/check_tool_printer/repositories/ICheckToolPrinterRepository';
import IScrapRepository from '@modules/scrap/repositories/IScrapRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Tracking from '@modules/trackings/infra/typeorm/entities/Tracking';
import IMaterialManagerRepository from '@modules/material/repositories/IMaterialManagerRepository';
import IMaterialManagerSetupRepository from '@modules/material/repositories/IMaterialManagerSetupRepository';
import IMaterialEntranceRepository from '@modules/material_entrance_smt/repositories/IMaterialEntranceRepository';
import IMaterialManagerRefilRepository from '@modules/material/repositories/IMaterialManagerRefilRepository';
import IDetailMaterialEntranceRepository from '@modules/material_entrance_smt/repositories/IDetailMaterialEntranceRepository';
import CheckToolPrinter from '@modules/check_tool_printer/infra/typeorm/entities/CheckToolPrinter';
import { ProductionOrder } from '../infra/typeorm/entities/ProductionOrders';
import IProductionOrdersRepository from '../repositories/IProductionOrdersRepository';
import ITrackingRepository from '../../trackings/repositories/ITrackingRepository';

interface IRequest {
  product_name: any;
  production_order: string;
}

interface ComponentsClosingKit {
  main_component: string;
  qty_scrap: number;
  qty_setup: number;
  qty_used_bom: number;
  qty_entrance: number;
  qty_refill: number;
  qty_saldo: number;
  qty_overall_balance: number;
  qty_consumption: number;
  main_description: string;

  alternative_components: any;
}

@injectable()
export default class CreateProductionOrderBalancesService {
  constructor(
    @inject('ProductionOrdersRepository')
    private productionOrder: IProductionOrdersRepository,

    @inject('CheckToolPrinterRepository')
    private checkToocPrinterRepository: ICheckToolPrinterRepository,

    @inject('ScrapRepository')
    private scrapRepository: IScrapRepository,

    @inject('TrackingRepository')
    private trackingsRepository: ITrackingRepository,

    @inject('MaterialManagerRepository')
    private materialManagerRepository: IMaterialManagerRepository,

    @inject('MaterialManagerSetupRepository')
    private materialManagerSetupRepository: IMaterialManagerSetupRepository,

    @inject('MaterialEntranceRepository')
    private materialEntranceRepository: IMaterialEntranceRepository,

    @inject('MaterialManagerRefilRepository')
    private materialManagerRefilRepository: IMaterialManagerRefilRepository,

    @inject('DetailMaterialEntranceRepository')
    private detailMaterialEntranceRepository: IDetailMaterialEntranceRepository
  ) {}

  async execute({ product_name, production_order }: IRequest): Promise<any> {
    let op: ProductionOrder | undefined;

    if (product_name !== 'undefined') {
      op = await this.productionOrder.findByProductName(product_name);

      if (!op) {
        throw new AppError('Produto não encontrado', 404);
      }
    } else {
      op = await this.productionOrder.findByCodeOp(String(production_order));

      if (!op) {
        throw new AppError('Ordem de produção não encontrada', 404);
      }
    }

    const components: ComponentsClosingKit[] = [];

    // Montando o objeto de components que vai para o front
    op.bomlist.forEach((item) => {
      const indexMain = components.findIndex(
        (com) => com.main_component === item.main_component
      );

      if (indexMain < 0) {
        components.push({
          main_component: item.main_component,
          main_description: item.description,
          qty_used_bom: item.qty_used,
          qty_scrap: 0,
          qty_setup: 0,
          qty_entrance: 0,
          qty_refill: 0,
          qty_saldo: 0,
          qty_overall_balance: 0,
          qty_consumption: 0,
          alternative_components: item.alternative_component
            ? [
              {
                alternative_component: item.alternative_component,
                qty_used_bom: item.qty_used,
                qty_scrap: 0,
                qty_setup: 0,
                qty_entrance: 0,
                qty_refill: 0,
                qty_saldo: 0,
                qty_overall_balance: 0,
                qty_consumption: 0,
              },
            ]
            : null,
        });
      } else {
        components[indexMain].alternative_components?.push({
          alternative_component: item.alternative_component,
          alternative_description: item.description,
          qty_used_bom: item.qty_used,
          qty_scrap: 0,
          qty_setup: 0,
          qty_entrance: 0,
          qty_refill: 0,
          qty_saldo: 0,
          qty_overall_balance: 0,
          qty_consumption: 0,
        });
      }
    });

    // Buscar os registro do posto printer para saber a lista
    const check_tool_printersAll =
      await this.checkToocPrinterRepository.findByProductionOrder(
        op.id as number
      );

    const check_tool_printers: CheckToolPrinter[] = [];

    check_tool_printersAll.forEach((item) => {
      const duplicated =
        check_tool_printers.findIndex((redItem) => {
          return item.list_code === redItem.list_code;
        }) > -1;

      if (!duplicated) {
        check_tool_printers.push(item);
      }
    });

    // eslint-disable-next-line no-restricted-syntax
    for await (const item of check_tool_printers) {
      const scraps = await this.scrapRepository.findByListCode(item.list_code);
      scraps.forEach((scrap) => {
        const findIndexMain = components.findIndex(
          (component) => component.main_component === scrap.serial_number
        );

        if (findIndexMain > -1) {
          components[findIndexMain].qty_scrap += scrap.material_quantity;
        }

        // const alternativeIndex = -1;
        components.forEach((component, index) => {
          if (component.alternative_components !== null) {
            const alternativeIndex = component.alternative_components.findIndex(
              (alternative: any) =>
                alternative.alternative_component === scrap.serial_number
            );

            if (alternativeIndex > -1) {
              components[index].alternative_components[
                alternativeIndex
              ].qty_scrap += scrap.material_quantity;
            }
          }
        });
      });
    }

    const trackings = await this.trackingsRepository.findTrackinsByOP(
      op.mo_code
    );

    const scraps = await this.scrapRepository.findByDate(op.mo_start_date);

    const scrapsPlacaPainel: any[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const scrap of scraps) {
      const findTracking = trackings.find(
        (tracking) => tracking.serial_number === scrap.serial_number
      );

      if (findTracking) {
        const checkToolPrinter = check_tool_printers.find(
          (item) => item.id_line === findTracking.id_line
        );

        if (checkToolPrinter) {
          const materialManager =
            await this.materialManagerRepository.findByListCodes(
              checkToolPrinter.list_code
            );



          materialManager.forEach((material) => {
            const findIndexMain = components.findIndex(
              (component) =>
                component.main_component === material.main_components
            );

            if (findIndexMain > -1) {
              components[findIndexMain].qty_scrap +=
                material.quantity * (scrap.number_plates_panel || 1);
            }

            components.forEach((component, index) => {
              if (component.alternative_components !== null) {
                const alternativeIndex =
                  component.alternative_components.findIndex(
                    (alternative: any) =>
                      alternative.alternative_component ===
                      material.alternative_components
                  );

                if (alternativeIndex > -1) {
                  components[index].alternative_components[
                    alternativeIndex
                  ].qty_scrap +=
                    scrap.material_quantity * (scrap.number_plates_panel || 1);
                }
              }
            });
          });
        }
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for await (const item of check_tool_printers) {
      const setups =
        await this.materialManagerSetupRepository.findSetupByListCode(
          item.list_code
        );

      setups.forEach((setup) => {
        const findIndexMain = components.findIndex(
          (component) => component.main_component === setup.component
        );

        if (findIndexMain > -1) {
          components[findIndexMain].qty_setup += setup.component_quantity;
        }

        components.forEach((component, index) => {
          if (component.alternative_components !== null) {
            const alternativeIndex = component.alternative_components.findIndex(
              (alternative: any) =>
                alternative.alternative_component === setup.component
            );

            if (alternativeIndex > -1) {
              components[index].alternative_components[
                alternativeIndex
              ].qty_setup += setup.component_quantity;
            }
          }
        });
      });

      const refills = await this.materialManagerRefilRepository.findByListCode(
        item.list_code
      );

      refills.forEach((refill) => {
        const findIndexMain = components.findIndex(
          (component) => component.main_component === refill.component_new
        );

        if (findIndexMain > -1) {
          components[findIndexMain].qty_refill += refill.component_quantity;
        }

        components.forEach((component, index) => {
          if (component.alternative_components !== null) {
            const alternativeIndex = component.alternative_components.findIndex(
              (alternative: any) =>
                alternative.alternative_component === refill.component_new
            );

            if (alternativeIndex > -1) {
              components[index].alternative_components[
                alternativeIndex
              ].qty_refill += refill.component_quantity;
            }
          }
        });
      });
    }

    const detailMaterialEntrance =
      await this.detailMaterialEntranceRepository.findByProductionOrder(
        op.mo_code
      );

    detailMaterialEntrance.forEach((detail) => {
      const findIndexMain = components.findIndex(
        (component) => component.main_component === detail.main_component
      );

      if (findIndexMain > -1) {
        components[findIndexMain].qty_entrance += detail.component_quantity;
      }

      components.forEach((component, index) => {
        if (component.alternative_components !== null) {
          const alternativeIndex = component.alternative_components.findIndex(
            (alternative: any) =>
              alternative.alternative_component === detail.component
          );

          if (alternativeIndex > -1) {
            components[findIndexMain].qty_entrance -= detail.component_quantity;
            components[index].alternative_components[
              alternativeIndex
            ].qty_entrance += detail.component_quantity;
          }
        }
      });
    });

    const componentsSum = components.map((item) => {
      let sumAlternativeScraps = 0
      const alternativeSum =
        item.alternative_components &&
        item.alternative_components.map((el: any) => {
          sumAlternativeScraps += el.qty_scrap
          return {
            ...el,
            qty_saldo: el.qty_entrance - (el.qty_refill + el.qty_setup),
          };
        });
      return {
        ...item,
        qty_consumption: (op?.output_qty || 0) * item.qty_used_bom,
        qty_overall_balance:
          item.qty_entrance -
          ((op?.output_qty || 0) * item.qty_used_bom +
            item.qty_scrap + sumAlternativeScraps),
        qty_saldo: item.qty_entrance - (item.qty_refill + item.qty_setup),
        alternative_components: alternativeSum,
      };
    });

    return {
      production_order: op.mo_code,
      date_production: op.mo_start_date,
      product: op.product.product_name,
      components: componentsSum,
    };
  }
}
