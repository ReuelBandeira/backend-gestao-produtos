import departamentsRouter from '@modules/employee/infra/http/routes/departaments.routes';
import employeesRouter from '@modules/employee/infra/http/routes/employees.routes';
import sessionsRouter from '@modules/employee/infra/http/routes/sessions.routes';
import productsRouter from '@modules/products/infra/http/routes/product.routes';
import toolingRouter from '@modules/tooling_control/infra/http/routes/tooling.routes';
import workgroupsRouter from '@modules/workgroups/infra/http/routes/workgroup.routes';
import workStationsRouter from '@modules/workstations/infra/http/routes/workstations.routes';
import { Router } from 'express';

import bomRouter from '@modules/bom/infra/http/routes/bom.routes';
import feederRouter from '@modules/feeder/infra/http/routes/feeders.routes';
import linesRouter from '@modules/lines/infra/http/routes/lines.routes';
import machineRouter from '@modules/machine/infra/http/routes/machines.routes';
import materialManagerRouter from '@modules/material/infra/http/routes/MaterialManager.routes';
import productionOrdersRouter from '@modules/production_orders/infra/http/routes/production_orders.routes';
import routesRouter from '@modules/route/infra/http/routes/route.routes';
import providerRouter from '@modules/solder_paste/infra/http/routes/provider.routes';
import toolgroupRouter from '@modules/tool_group/infra/http/routes/toolgroup.routes';

import actionRouter from '@modules/action/infra/http/routes/action.routes';
import causeRouter from '@modules/cause/infra/http/routes/cause.routes';
import defectRouter from '@modules/defect/infra/http/routes/defect.routes';
import inactivateToolsRouter from '@modules/inactivate_tools/infra/http/routes/activateTools.routes';
import maintenanceRouter from '@modules/maintenance_feeder/infra/http/routes/maintenanceFeeder.routes';

import squeegeeRouter from '@modules/squeegees/infra/http/routes/squeegee.routes';

import machine_registersRouter from '@modules/machine_registers/infra/http/routes/machine_registers.routes';

import downtimeManagementRouter from '@modules/downtime_management/infra/http/routes/downtime_management.routes';

import causeDowntimeRouter from '@modules/cause_downtime/infra/http/routes/cause_downtime.routes';

import typeDowntimeRouter from '@modules/type_downtime/infra/http/routes/typeDowntime.routes';

import actionDowntimeRouter from '@modules/action_downtime/infra/http/routes/actionDowntime.routes';

import moduleRouter from '@modules/module_machines/infra/http/routes/moduleMachines.routes';
import originRouter from '@modules/origins/infra/http/routes/origin.routes';
import repairRouter from '@modules/repairs/infra/http/routes/repair.routes';
import scrapRuter from '@modules/scrap/infra/http/routes/scrap.routes';
import sNDetailRouter from '@modules/sn_detail/infra/http/routes/sndetail.routes';
import solutionRouter from '@modules/solutions/infra/http/routes/solution.routes';
import stencilWashRuter from '@modules/stencil_wash/infra/http/routes/stencilWash.routes';
import trackingRouter from '@modules/trackings/infra/http/routes/tracking.routes';

import cartRouter from '@modules/cart/infra/http/routes/Cart.routes';
import cartMngShelfRouter from '@modules/cart/infra/http/routes/CartMngShelf.routes';
import cartShelfRouter from '@modules/cart/infra/http/routes/CartShelf.routes';
import cartCriticalRouter from '@modules/cart_criticals/infra/http/routes/CartCritical.routes';
import cartMovimentRouter from '@modules/cart_moviments/infra/http/routes/CartMoviment.routes';
import causeCategoryDowntimeRouter from '@modules/category_cause_downtime/infra/http/routes/cause_category__downtime.routes';
import criticalComponentRouter from '@modules/critical_components/infra/http/routes/criticalComponent.routes';
import managementRouter from '@modules/levels_management_msl/infra/http/routes/levels_management.routes';
import managementMslRouter from '@modules/management_msl/infra/http/routes/managementMsl.routes';
import materialEntranceRouter from '@modules/material_entrance_smt/infra/http/routes/materialEntrance.routes';
import mslMachinesRouter from '@modules/msl_machines/infra/http/routes/msl_machines.routes';
import mslMovementRouter from '@modules/msl_movements/infra/http/routes/mslMovement.routes';
import plateWashingRouter from '@modules/plate_washing/infra/http/routes/plateWashing.routes';
import productivityJustificationRouter from '@modules/productivity_justification/infra/http/routes/productivityJustification.routes';
import shiftRouter from '@modules/shifts/infra/http/routes/shift.routes';
import snCompositionRouter from '@modules/sn_composition/infra/http/routes/snComposition.routes';
import snGeneratedRouter from '@modules/sn_generated/infra/http/routes/snGenerated.routes';
import targetRouter from '@modules/targets/infra/http/routes/target.routes';
import viewsRouter from '@modules/views_oee/infra/http/routes/views.routes';
import familyRecordRouter from '@modules/family_record/infra/http/routes/family_record.routes';
import viewsQualityRouter from '@modules/views_quality/infra/http/routes/views_quality.routes';
import viewsMaintenanceRouter from '@modules/views_maintenance/infra/http/routes/views_maintenance.routes';
import modelsRouter from '@modules/model/infra/http/routes/model.routes';

import headNozzleRouter from '@modules/head_nozzle/infra/http/routes/head_nozzle.routes';

import ovenRouter from '@modules/oven/infra/http/routes/oven.routes';

import ovenRecordRouter from '@modules/oven_temperature_record/infra/http/routes/oven_temperature_record.routes';

import reportRouter from '@modules/report-scrap-quality-productivity/infra/http/routes/report.routes';

const routes = Router();

routes.use('/employees', employeesRouter);
routes.use('/departaments', departamentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/workgroups', workgroupsRouter);
routes.use('/workstations', workStationsRouter);
routes.use('/products', productsRouter);
routes.use('/tooling', toolingRouter);

routes.use('/lines', linesRouter);
routes.use('/bom', bomRouter);
routes.use('/production', productionOrdersRouter);
routes.use('/routes', routesRouter);
routes.use('/machines', machineRouter);
routes.use('/material', materialManagerRouter);
routes.use('/solder-paste', providerRouter);

routes.use('/feeders', feederRouter);
routes.use('/toolgroup', toolgroupRouter);

routes.use('/cause', causeRouter);
routes.use('/defect', defectRouter);
routes.use('/action', actionRouter);
routes.use('/maintenance', maintenanceRouter);

routes.use('/inactivateTools', inactivateToolsRouter);
// adcionado para o crud do rodo
routes.use('/squeegees', squeegeeRouter);

routes.use('/machine-registers', machine_registersRouter);

routes.use('/downtime', downtimeManagementRouter);

routes.use('/cause-downtime', causeDowntimeRouter);

routes.use('/type-downtime', typeDowntimeRouter);

routes.use('/action-downtime', actionDowntimeRouter);

routes.use('/module-machines', moduleRouter);

routes.use('/scrap', scrapRuter);

routes.use('/stencil-wash', stencilWashRuter);

routes.use('/sn-detail', sNDetailRouter);

routes.use('/tracking', trackingRouter);

routes.use('/solutions', solutionRouter);

routes.use('/origins', originRouter);

routes.use('/repairs', repairRouter);

routes.use('/category-cause-downtime', causeCategoryDowntimeRouter);

routes.use('/targets', targetRouter);
routes.use('/plate-washing', plateWashingRouter);
routes.use('/shifts', shiftRouter);

routes.use('/material-entrance-smt', materialEntranceRouter);

routes.use('/levels-management-msl', managementRouter);

routes.use('/management-msl', managementMslRouter);

routes.use('/machines-msl', mslMachinesRouter);

routes.use('/movements-msl', mslMovementRouter);

routes.use('/views', viewsRouter);

routes.use('/sn-composition', snCompositionRouter);

routes.use('/sn-generate', snGeneratedRouter);

routes.use('/justification', productivityJustificationRouter)

routes.use('/criticals', criticalComponentRouter)

routes.use('/cart', cartRouter);

routes.use('/shelf', cartShelfRouter);

routes.use('/shelfMng', cartMngShelfRouter);

routes.use('/cart-moviment', cartMovimentRouter);

routes.use('/cart-critical', cartCriticalRouter)

routes.use('/family-record', familyRecordRouter);

routes.use('/views-quality', viewsQualityRouter);

routes.use('/views-maintenance', viewsMaintenanceRouter);

routes.use('/models', modelsRouter);

routes.use('/head-nozzle', headNozzleRouter);

routes.use('/oven', ovenRouter);

routes.use('/ovenRecord', ovenRecordRouter);

routes.use('/report-scrap-quality', reportRouter)

export default routes;
