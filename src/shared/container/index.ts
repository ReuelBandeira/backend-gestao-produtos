import { container } from 'tsyringe';

import EmployeeRepository from '@modules/employee/infra/typeorm/repositories/EmployeeRepository';
import '@modules/employee/providers';
import IEmployeeRepository from '@modules/employee/repositories/IEmployeeRepository';
import WorkgroupsRepository from '@modules/workgroups/infra/typeorm/repositories/WorkgroupsRepository';
import IWorkgroupRepository from '@modules/workgroups/repositories/IWorkgroupRepository';
import WorkStationRepository from '@modules/workstations/infra/typeorm/repositories/WorkStationRepository';
import IWorkStationRepository from '@modules/workstations/repositories/IWorkStationRepository';
import './providers';

import ToolingControlRepository from '@modules/tooling_control/infra/typeorm/repositories/ToolingControlRepository';
import IToolingControlRepository from '@modules/tooling_control/repositories/IToolingControlRepository';

import BomRepository from '@modules/bom/infra/typeorm/repositories/BomRepository';
import IBomRepository from '@modules/bom/repositories/ICreateBomRepository';
import { FeederRepository } from '@modules/feeder/infra/typeorm/repositories/FeederRepository';
import { IFeederRepository } from '@modules/feeder/repositories/IFeederRepository';
import LineRepository from '@modules/lines/infra/typeorm/repositories/LineRepository';
import ILineRepository from '@modules/lines/repositories/ILineRepository';
import MachineRepository from '@modules/machine/infra/typeorm/repositories/MachineRepository';
import IMachineRepository from '@modules/machine/repositories/ICreateMachineRepository';
import { MaterialManagerRepository } from '@modules/material/infra/typeorm/repositories/MaterialManagerRepository';
import IMaterialManagerRepository from '@modules/material/repositories/IMaterialManagerRepository';
import ProductionOrdersRepository from '@modules/production_orders/infra/typeorm/repositories/ProductionOrdersRepository';
import IProductionOrdersRepository from '@modules/production_orders/repositories/IProductionOrdersRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import RouteBodyRepository from '@modules/route/infra/typeorm/repositories/RouteBodyRepository';
import RouteHeadRepository from '@modules/route/infra/typeorm/repositories/RouteHeadRepository';
import IRouteBodyRepository from '@modules/route/repositories/IRouteBodyRepository';
import IRouteHeadRepository from '@modules/route/repositories/IRouteHeadRepository';

import MaterialManagerChangeFeederRepository from '@modules/material/infra/typeorm/repositories/MaterialManagerChangeFeederRepository';
import MaterialManagerRefilRepository from '@modules/material/infra/typeorm/repositories/MaterialManagerRefilRepository';
import MaterialManagerSetupRepository from '@modules/material/infra/typeorm/repositories/MaterialManagerSetupRepository';
import QualityBodyManagerRepository from '@modules/material/infra/typeorm/repositories/QualityBodyManagerRepository ';
import QualityHeadManagerRepository from '@modules/material/infra/typeorm/repositories/QualityHeadManagerRepository';
import VersionListMaterialManagerRepository from '@modules/material/infra/typeorm/repositories/VersionListMaterialManagerRepository';
import IMaterialManagerChangeFeederRepository from '@modules/material/repositories/IMaterialManagerChangeFeederRepository';
import IMaterialManagerRefilRepository from '@modules/material/repositories/IMaterialManagerRefilRepository';
import IMaterialManagerSetupRepository from '@modules/material/repositories/IMaterialManagerSetupRepository';
import IQualityBodyManagerRepository from '@modules/material/repositories/IQualityBodyManagerRepository';
import IQualityHeadManagerRepository from '@modules/material/repositories/IQualityHeadManagerRepository';
import IVersionListMaterialManagerRepository from '@modules/material/repositories/IVersionListaterialManagerRepository';
//
import LogRoutineFinishRepository from '@modules/material/infra/typeorm/repositories/LogRoutineFinhishRepository';
import ILogRoutineFinishRepository from '@modules/material/repositories/ILogRoutineFinishRepository';
//
import MaterialManagerLogFeederRepository from '@modules/material/infra/typeorm/repositories/MaterialManagerLogFeederRepository';
import MaterialManagerLogQualityRepository from '@modules/material/infra/typeorm/repositories/MaterialManagerLogQualityRepository';
import MaterialManagerLogRefilRepository from '@modules/material/infra/typeorm/repositories/MaterialManagerLogRefilRepository';
import IMaterialManagerLogFeederRepository from '@modules/material/repositories/IMaterialManagerLogFeederRespository';
import IMaterialManagerLogQualityRepository from '@modules/material/repositories/IMaterialManagerLogQualityRepository';
import IMaterialManagerLogRefilRepository from '@modules/material/repositories/IMaterialManagerLogRefilRepository';
import ProviderRepository from '@modules/solder_paste/infra/typeorm/repositories/ProviderRepository';
import IProviderRepository from '@modules/solder_paste/repositories/IProviderRepository';

import SolderPasteRepository from '@modules/solder_paste/infra/typeorm/repositories/SolderPasteRepository';
import ISolderPasteRepository from '@modules/solder_paste/repositories/ISolderPasteRepository';

import SolderPasteControllRepository from '@modules/solder_paste/infra/typeorm/repositories/SolderPasteControllRepository';
import ISolderPasteControllRepository from '@modules/solder_paste/repositories/ISolderPasteControllRepository';

import SolderPasteTimeRepository from '@modules/solder_paste/infra/typeorm/repositories/SolderPasteTimeRepository';
import ISolderPasteTimeRepository from '@modules/solder_paste/repositories/ISolderPasteTimeRepository';

import ToolgroupRepository from '@modules/tool_group/infra/typeorm/repositories/ToolgroupRepository';
import IToolgroupRepository from '@modules/tool_group/repositories/IToolgroupRepository';

import CauseRepository from '@modules/cause/infra/typeorm/repositories/CauseRepository';
import ICauseRepository from '@modules/cause/repositories/ICauseRepository';

import DefectRepository from '@modules/defect/infra/typeorm/repositories/DefectRepository';
import IDefectRepository from '@modules/defect/repositories/IDefectRepository';
import InactivateToolsRepository from '@modules/inactivate_tools/infra/typeorm/repositories/InactivateToolsRepository';
import IInactivateToolsRepository from '@modules/inactivate_tools/repositories/IInactivateToolsRepository';

import { MaintenanceFeederRepository } from '@modules/maintenance_feeder/infra/typeorm/repositories/MaintenanceFeederRepository';
import { IMaintenanceFeederRepository } from '@modules/maintenance_feeder/repositories/IMaintenanceFeederRepository';

import ActionRepository from '@modules/action/infra/typeorm/repositories/ActionRepository';
import IActionRepository from '@modules/action/repositories/IActionRepository';

import { MaintenanceFeederActionsRepository } from '@modules/maintenance_feeder/infra/typeorm/repositories/MaintenanceFeederActionsRepository';
import { IMaintenanceFeederActionsRepository } from '@modules/maintenance_feeder/repositories/IMaintenanceFeederActionsRepository';

import { SqueegeeRepository } from '@modules/squeegees/infra/typeorm/repositories/SqueegeeRepository';
import { ISqueegeeRepository } from '@modules/squeegees/repositories/ISqueegeeRepository';

import MachineRegistersRepository from '@modules/machine_registers/infra/typeorm/repositories/MachineRegistersRepository';
import IMachineRegistersRepository from '@modules/machine_registers/repositories/IMachineRegistersRepository';

import DowntimeManagementRepository from '@modules/downtime_management/infra/typeorm/repositories/DowntimeManagementRepository';
import IDowntimeManagementRepository from '@modules/downtime_management/repositories/IDowntimeManagementRepository';

import CauseDowntimeRepository from '@modules/cause_downtime/infra/typeorm/repositories/CauseDowntimeRepository';
import ICauseDowntimeRepository from '@modules/cause_downtime/repositories/ICauseDowntimeRepository';

import TypeRepository from '@modules/type_downtime/infra/typeorm/repositories/TypeRepository';
import ITypeRepository from '@modules/type_downtime/repositories/ITypeRepository';

import ActionDowntimeRepository from '@modules/action_downtime/infra/typeorm/repositories/ActionDowntimeRepository';
import IActionDowntimeRepository from '@modules/action_downtime/repositories/IActionDowntimeRepository';

import MachineRegistersModulesRepository from '@modules/machine_registers/infra/typeorm/repositories/MachineRegistersModulesRepository';
import IMachineRegistersModulesRepository from '@modules/machine_registers/repositories/IMachineRegistersModulesRepository';

import ModulesRepository from '@modules/module_machines/infra/typeorm/repositories/ModulesRepository';
import IModulesRepository from '@modules/module_machines/repositories/IModulesRepository';
import OriginRepository from '@modules/origins/infra/typeorm/repositories/OtiginRepository';
import IOriginRepository from '@modules/origins/repositories/IOriginRepository';
import RepairRepository from '@modules/repairs/infra/typeorm/repositories/RepairRepository';
import IRepairRepository from '@modules/repairs/repositories/IRepairRepository';
import ScrapRepository from '@modules/scrap/infra/typeorm/repositories/ScrapRepository';
import IScrapRepository from '@modules/scrap/repositories/IScrapRepository';
import SNDetailRepository from '@modules/sn_detail/infra/typeorm/repositories/SNDetailRepository';
import ISNDetailRepository from '@modules/sn_detail/repositories/ISNDetailRepository';
import SolutionRepository from '@modules/solutions/infra/typeorm/repositories/SolutionRepository';
import ISolutionRepository from '@modules/solutions/repositories/ISolutionRepository';
import StencilWashRepository from '@modules/stencil_wash/infra/typeorm/repositories/StencilWashRepository';
import IStencilWashRepository from '@modules/stencil_wash/repositories/IStencilWashRepository';
import TrackingRepository from '@modules/trackings/infra/typeorm/repositories/TrackingRepository';
import ITrackingRepository from '@modules/trackings/repositories/ITrackingRepository';

import DowntimeCheckinControlRepository from '@modules/downtime_management/infra/typeorm/repositories/DowntimeCheckinControlRepository';
import IDowntimeCheckinControlRepository from '@modules/downtime_management/repositories/IDowntimeCheckinControlRepository';

import CauseCategoryDowntimeRepository from '@modules/category_cause_downtime/infra/typeorm/repositories/CauseCategoryDowntimeRepository';
import ICauseCategoryDowntimeRepository from '@modules/category_cause_downtime/repositories/ICauseCategoryDowntimeRepository';
import TargetRepository from '@modules/targets/infra/typeorm/repositories/TargetRepository';
import ITargetRepository from '@modules/targets/repositories/ITargetRepository';

import PlateWashingRepository from '@modules/plate_washing/infra/typeorm/repositories/PlateWashingRepository';
import IPlateWashingRepository from '@modules/plate_washing/repositories/IPlateWashingRepository';
import ShiftRepository from '@modules/shifts/infra/typeorm/repositories/ShiftRepository';
import IShiftRepository from '@modules/shifts/repositories/IShiftRepository';

import CheckToolPrinterRepository from '@modules/check_tool_printer/infra/typeorm/repositories/CheckToolPrinterRepository';
import ICheckToolPrinterRepository from '@modules/check_tool_printer/repositories/ICheckToolPrinterRepository';
import ProductProviderSolderPasteRepository from '@modules/products/infra/typeorm/repositories/ProductProviderSolderPasteRepository';
import IProductProviderSolderPasteRepository from '@modules/products/repositories/IProductProviderSolderPasteRepository';

import MaterialEntranceRepository from '@modules/material_entrance_smt/infra/typeorm/repositories/MaterialEntranceRepository';
import IMaterialEntranceRepository from '@modules/material_entrance_smt/repositories/IMaterialEntranceRepository';

import HistoryMachineSNRepository from '@modules/HistoryMachineSN/infra/typeorm/repositories/HistoryMachineSNRepository';
import IHistoryMachineSNRepository from '@modules/HistoryMachineSN/repositories/IHistoryMachineSNRepository';
import ManagementRepository from '@modules/levels_management_msl/infra/typeorm/repositories/ManagementRepository';
import IManagementRepository from '@modules/levels_management_msl/repositories/IManagementRepository';
import ManagementMslRepository from '@modules/management_msl/infra/typeorm/repositories/ManagementMslRepository';
import IManagementMslRepository from '@modules/management_msl/repositories/IManagementMslRepository';
import DetailMaterialEntranceRepository from '@modules/material_entrance_smt/infra/typeorm/repositories/DetailMaterialEntranceRepository';
import IDetailMaterialEntranceRepository from '@modules/material_entrance_smt/repositories/IDetailMaterialEntranceRepository';
import MslMachinesRepository from '@modules/msl_machines/infra/typeorm/repositories/MslMachinesRepository';
import IMslMachinesRepository from '@modules/msl_machines/repositories/IMslMachinesRepository';
import MslMovementRepository from '@modules/msl_movements/infra/typeorm/repositories/MslMovementRepository';
import IMslMovementRepository from '@modules/msl_movements/repositories/IMslMovementRepository';
import ProductivityJustificationRepository from '@modules/productivity_justification/infra/typeorm/repositories/ProductivityJustificationRepository';
import IProductivityJustificationRepository from '@modules/productivity_justification/repositories/IProductivityJustificationRepository';
import ProductDelimiterRepository from '@modules/products/infra/typeorm/repositories/ProductDelimiterRepository';
import IProductDelimiterRepository from '@modules/products/repositories/IProductDelimiterRepository';
import SnCompositionRepository from '@modules/sn_composition/infra/typeorm/repositories/SnCompositionRepository';
import ISnCompositionRepository from '@modules/sn_composition/repositories/ISnRepository';
import SnGeneratedRepository from '@modules/sn_generated/infra/typeorm/repositories/SnGeneratedRepository';
import ISnGeneratedRepository from '@modules/sn_generated/repositories/ISnGeneratedRepository';
import ViewsRepository from '@modules/views_oee/infra/typeorm/repositories/DowtimeRankingOpRepository';
import IViewsRepository from '@modules/views_oee/repositories/IDowtimeRankingOpRepository';

import { CriticalComponentRepository } from '@modules/critical_components/infra/typeorm/repositories/CriticalComponentRepository';
import { ICriticalComponentRepository } from '@modules/critical_components/repositories/ICriticalComponentRepository';
import SolderPasteMixerRepository from '@modules/solder_paste/infra/typeorm/repositories/SolderPasteMixer';
import ISolderPasteMixerRepository from '@modules/solder_paste/repositories/ISolderPasteMixerRepository';

import CartMngShelfRepository from '@modules/cart/infra/typeorm/repositories/CartMngShelfRepository';
import CartRepository from '@modules/cart/infra/typeorm/repositories/CartRepository';
import ICartMngShelfRepository from '@modules/cart/repositories/ICartMngShelfRepository';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import CartCriticalRepository from '@modules/cart_criticals/infra/typeorm/repositories/CartCriticalRepository';
import { ICartCriticalRepository } from '@modules/cart_criticals/repositories/ICartCriticalRepository';
import CartMovimentRepository from '@modules/cart_moviments/infra/typeorm/repositories/CartMovimentRepository';
import { ICartMovimentRepository } from '@modules/cart_moviments/repositories/ICartMovimentRepository';

import ViewsQualityRepository from '@modules/views_quality/infra/typeorm/repositories/QualityFamilyRepository';
import IViewsQualityRepository from '@modules/views_quality/repositories/IQualityFamilyRepository';

import IFamilyRecordRepository from '@modules/family_record/repositories/IFamilyRecordRepository';
import FamilyRecordRepository from '@modules/family_record/infra/typeorm/repositories/FamilyRecordRepository';

import ViewsMaintenanceRepository from '@modules/views_maintenance/infra/typeorm/repositories/MaintenanceAlldwRepository';
import IViewsMaintenanceRepository from '@modules/views_maintenance/repositories/IMaintenanceAlldwRepository';

import IQuantityCurrentOrderRepository from '@modules/views_oee/repositories/IQuantityCurrentOrderRepository';
import QuantityCurrentOrderRepository from '@modules/views_oee/infra/typeorm/repositories/QuantityCurrentOrderRepository';

import IModelRepository from '@modules/model/repositories/IModelRepository';
import ModelRepository from '@modules/model/infra/typeorm/repositories/ModelRepository';
import IHeadNozzleRepository from '@modules/head_nozzle/repositories/IHeadNozzleRepository';
import HeadNozzleRepository from '@modules/head_nozzle/infra/typeorm/repositories/HeadNozzleRepository';
import IMaintenanceHeadNozzleRepository from '@modules/head_nozzle/repositories/IMaintenanceHeadNozzleRepository';
import MaintenanceHeadNozzleRepository from '@modules/head_nozzle/infra/typeorm/repositories/MaintenanceHeadNozzleRepository';

import IOvenRepository from '@modules/oven/repositories/IOvenRepository';
import OvenRepository from '@modules/oven/infra/typeorm/repositories/OvenRepository';

import IOvenTemperatureRecordRepository from '@modules/oven_temperature_record/repositories/IOvenTemperatureRecordRepository';
import OvenTemperatureRecordRepository from '@modules/oven_temperature_record/infra/typeorm/repositories/OvenTemperatureRecordRepository';

import IReportRepository from '@modules/report-scrap-quality-productivity/repositories/IReportRepository';
import ReportRepository from '@modules/report-scrap-quality-productivity/infra/typeorm/repositories/ReportRepository';




container.registerSingleton<IEmployeeRepository>(
  'EmployeeRepository',
  EmployeeRepository
);

container.registerSingleton<IWorkgroupRepository>(
  'WorkgroupsRepository',
  WorkgroupsRepository
);

container.registerSingleton<IWorkStationRepository>(
  'WorkStationRepository',
  WorkStationRepository
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

// container toolingcontrol
container.registerSingleton<IToolingControlRepository>(
  'ToolingControlRepository',
  ToolingControlRepository
);

container.registerSingleton<ILineRepository>('LineRepository', LineRepository);

container.registerSingleton<IProductionOrdersRepository>(
  'ProductionOrdersRepository',
  ProductionOrdersRepository
);

container.registerSingleton<IBomRepository>('BomRepository', BomRepository);

container.registerSingleton<IRouteHeadRepository>(
  'RouteHeadRepository',
  RouteHeadRepository
);

container.registerSingleton<IRouteBodyRepository>(
  'RouteBodyRepository',
  RouteBodyRepository
);

container.registerSingleton<IMachineRepository>(
  'MachineRepository',
  MachineRepository
);

container.registerSingleton<IMaterialManagerRepository>(
  'MaterialManagerRepository',
  MaterialManagerRepository
);

container.registerSingleton<IFeederRepository>(
  'FeederRepository',
  FeederRepository
);

container.registerSingleton<IVersionListMaterialManagerRepository>(
  'VersionListMaterialManagerRepository',
  VersionListMaterialManagerRepository
);

container.registerSingleton<IMaterialManagerSetupRepository>(
  'MaterialManagerSetupRepository',
  MaterialManagerSetupRepository
);

container.registerSingleton<IMaterialManagerRefilRepository>(
  'MaterialManagerRefilRepository',
  MaterialManagerRefilRepository
);

container.registerSingleton<IQualityHeadManagerRepository>(
  'QualityHeadManagerRepository',
  QualityHeadManagerRepository
);

container.registerSingleton<IQualityBodyManagerRepository>(
  'QualityBodyManagerRepository',
  QualityBodyManagerRepository
);

container.registerSingleton<IMaterialManagerChangeFeederRepository>(
  'MaterialManagerChangeFeederRepository',
  MaterialManagerChangeFeederRepository
);

//
container.registerSingleton<ILogRoutineFinishRepository>(
  'LogRoutineFinishRepository',
  LogRoutineFinishRepository
);

//

container.registerSingleton<IMaterialManagerLogQualityRepository>(
  'MaterialManagerLogQualityRepository',
  MaterialManagerLogQualityRepository
);

container.registerSingleton<IMaterialManagerLogRefilRepository>(
  'MaterialManagerLogRefilRepository',
  MaterialManagerLogRefilRepository
);

container.registerSingleton<IMaterialManagerLogFeederRepository>(
  'MaterialManagerLogFeederRepository',
  MaterialManagerLogFeederRepository
);

container.registerSingleton<IProviderRepository>(
  'ProviderRepository',
  ProviderRepository
);

container.registerSingleton<ISolderPasteRepository>(
  'SolderPasteRepository',
  SolderPasteRepository
);

container.registerSingleton<ISolderPasteControllRepository>(
  'SolderPasteControllRepository',
  SolderPasteControllRepository
);

container.registerSingleton<ISolderPasteTimeRepository>(
  'SolderPasteTimeRepository',
  SolderPasteTimeRepository
);

container.registerSingleton<IToolgroupRepository>(
  'ToolgroupRepository',
  ToolgroupRepository
);

container.registerSingleton<ICauseRepository>(
  'CauseRepository',
  CauseRepository
);

container.registerSingleton<IDefectRepository>(
  'DefectRepository',
  DefectRepository
);

container.registerSingleton<IActionRepository>(
  'ActionRepository',
  ActionRepository
);

container.registerSingleton<IMaintenanceFeederRepository>(
  'MaintenanceFeederRepository',
  MaintenanceFeederRepository
);

container.registerSingleton<IMaintenanceFeederActionsRepository>(
  'MaintenanceFeederActionsRepository',
  MaintenanceFeederActionsRepository
);

container.registerSingleton<IInactivateToolsRepository>(
  'InactivateToolsRepository',
  InactivateToolsRepository
);
// adcionado para o crud do rodo
container.registerSingleton<ISqueegeeRepository>(
  'SqueegeeRepository',
  SqueegeeRepository
);

container.registerSingleton<IMachineRegistersRepository>(
  'MachineRegistersRepository',
  MachineRegistersRepository
);

container.registerSingleton<IDowntimeManagementRepository>(
  'DowntimeManagementRepository',
  DowntimeManagementRepository
);

container.registerSingleton<ICauseDowntimeRepository>(
  'CauseDowntimeRepository',
  CauseDowntimeRepository
);

container.registerSingleton<ITypeRepository>('TypeRepository', TypeRepository);

container.registerSingleton<IActionDowntimeRepository>(
  'ActionDowntimeRepository',
  ActionDowntimeRepository
);

container.registerSingleton<IMachineRegistersModulesRepository>(
  'MachineRegistersModulesRepository',
  MachineRegistersModulesRepository
);

container.registerSingleton<IModulesRepository>(
  'ModulesRepository',
  ModulesRepository
);

container.registerSingleton<IScrapRepository>(
  'ScrapRepository',
  ScrapRepository
);

container.registerSingleton<ITrackingRepository>(
  'TrackingRepository',
  TrackingRepository
);

container.registerSingleton<IStencilWashRepository>(
  'StencilWashRepository',
  StencilWashRepository
);

container.registerSingleton<ISNDetailRepository>(
  'SNDetailRepository',
  SNDetailRepository
);

container.registerSingleton<ISolutionRepository>(
  'SolutionRepository',
  SolutionRepository
);

container.registerSingleton<IOriginRepository>(
  'OriginRepository',
  OriginRepository
);

container.registerSingleton<IDowntimeCheckinControlRepository>(
  'DowntimeCheckinControlRepository',
  DowntimeCheckinControlRepository
);

container.registerSingleton<ICauseCategoryDowntimeRepository>(
  'CauseCategoryDowntimeRepository',
  CauseCategoryDowntimeRepository
);

container.registerSingleton<ITargetRepository>(
  'TargetRepository',
  TargetRepository
);

container.registerSingleton<IPlateWashingRepository>(
  'PlateWashingRepository',
  PlateWashingRepository
);

container.registerSingleton<IShiftRepository>(
  'ShiftRepository',
  ShiftRepository
);

container.registerSingleton<IProductProviderSolderPasteRepository>(
  'ProductProviderSolderPasteRepository',
  ProductProviderSolderPasteRepository
);

container.registerSingleton<ICheckToolPrinterRepository>(
  'CheckToolPrinterRepository',
  CheckToolPrinterRepository
);

container.registerSingleton<IMaterialEntranceRepository>(
  'MaterialEntranceRepository',
  MaterialEntranceRepository
);

container.registerSingleton<IDetailMaterialEntranceRepository>(
  'DetailMaterialEntranceRepository',
  DetailMaterialEntranceRepository
);

container.registerSingleton<IManagementRepository>(
  'ManagementRepository',
  ManagementRepository
);

container.registerSingleton<IProductDelimiterRepository>(
  'ProductDelimiterRepository',
  ProductDelimiterRepository
);

container.registerSingleton<IManagementMslRepository>(
  'ManagementMslRepository',
  ManagementMslRepository
);

container.registerSingleton<IMslMachinesRepository>(
  'MslMachinesRepository',
  MslMachinesRepository
);

container.registerSingleton<IMslMovementRepository>(
  'MslMovementRepository',
  MslMovementRepository
);

container.registerSingleton<IViewsRepository>(
  'ViewsRepository',
  ViewsRepository
);


container.registerSingleton<IHistoryMachineSNRepository>(
  'HistoryMachineSNRepository',
  HistoryMachineSNRepository
);

container.registerSingleton<ISnCompositionRepository>(
  'SnCompositionRepository',
  SnCompositionRepository
);

container.registerSingleton<ISnGeneratedRepository>(
  'SnGeneratedRepository',
  SnGeneratedRepository
);

container.registerSingleton<IRepairRepository>(
  'RepairRepository',
  RepairRepository
);

container.registerSingleton<IProductivityJustificationRepository>(
  'ProductivityJustificationRepository',
  ProductivityJustificationRepository
);

container.registerSingleton<ISolderPasteMixerRepository>(
  'SolderPasteMixerRepository',
  SolderPasteMixerRepository
);

container.registerSingleton<ICriticalComponentRepository>(
  'CriticalComponentRepository',
  CriticalComponentRepository
);

container.registerSingleton<ICartRepository>(
  'CartRepository',
  CartRepository
);

container.registerSingleton<ICartMngShelfRepository>(
  'CartMngShelfRepository',
  CartMngShelfRepository
);

container.registerSingleton<ICartMovimentRepository>(
  'CartMovimentRepository',
  CartMovimentRepository
);

container.registerSingleton<ICartCriticalRepository>(
  'CartCriticalRepository',
  CartCriticalRepository
);

container.registerSingleton<IFamilyRecordRepository>(
  'FamilyRecordRepository',
  FamilyRecordRepository
);

container.registerSingleton<IViewsMaintenanceRepository>(
  'ViewsMaintenanceRepository',
  ViewsMaintenanceRepository
);


container.registerSingleton<IViewsQualityRepository>(
  'ViewsQualityRepository',
  ViewsQualityRepository
);

container.registerSingleton<IQuantityCurrentOrderRepository>(
  'QuantityCurrentOrderRepository',
  QuantityCurrentOrderRepository
);

container.registerSingleton<IModelRepository>(
  'ModelRepository',
  ModelRepository
);

container.registerSingleton<IHeadNozzleRepository>(
  'HeadNozzleRepository',
  HeadNozzleRepository
);

container.registerSingleton<IMaintenanceHeadNozzleRepository>(
  'MaintenanceHeadNozzleRepository',
  MaintenanceHeadNozzleRepository
);

container.registerSingleton<IOvenRepository>(
  'OvenRepository',
  OvenRepository
);

container.registerSingleton<IOvenTemperatureRecordRepository>(
  'OvenTemperatureRecordRepository',
  OvenTemperatureRecordRepository
);

container.registerSingleton<IReportRepository>(
  'ReportRepository',
  ReportRepository
);

